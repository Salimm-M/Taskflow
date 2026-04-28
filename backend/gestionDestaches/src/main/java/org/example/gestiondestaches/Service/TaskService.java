package org.example.gestiondestaches.Service;

import ch.qos.logback.classic.spi.IThrowableProxy;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.example.gestiondestaches.DTO.FichierDTO;
import org.example.gestiondestaches.DTO.TaskDTO.TaskCreateDTO;
import org.example.gestiondestaches.DTO.TaskDTO.TaskResponseDTO;
import org.example.gestiondestaches.DTO.TaskDTO.TaskUpdateDTO;
import org.example.gestiondestaches.DTO.TaskDTO.TreeTaskDTO;
import org.example.gestiondestaches.Mapper.FichierMapper;
import org.example.gestiondestaches.Mapper.ProjetMapper;
import org.example.gestiondestaches.Mapper.TaskMapper;
import org.example.gestiondestaches.Repository.FichierRepositiory;
import org.example.gestiondestaches.Repository.ProjetRepository;
import org.example.gestiondestaches.Repository.TaskRepository;
import org.example.gestiondestaches.Repository.UserRepository;
import org.example.gestiondestaches.entite.*;
import org.example.gestiondestaches.enummiration.ERole;
import org.example.gestiondestaches.enummiration.EStauts;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.json.JsonMapper;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class TaskService {
    private final ProjetMapper projetMapper;
    private final ProjetRepository projetRepository;
    private final JsonMapper.Builder builder;
    private TaskRepository taskRepository;
    private TaskMapper taskMapper;
    private UserRepository userRepository;
    private FichierMapper fichierMapper;
    private FichierRepositiory  fichierRepositiory;

    public TaskResponseDTO ajoutTask(TaskCreateDTO dto) {

        Task task = taskMapper.toTask(dto);

        Projet projet = projetRepository.findById(dto.getIdProjet())
                .orElseThrow(() -> new EntityNotFoundException("Projet not found"));

        task.setProjet(projet);

        if (dto.getIdParentTask() != null) {
            Task parent = taskRepository.findById(dto.getIdParentTask())
                    .orElseThrow(() -> new EntityNotFoundException("Task not found"));

            task.setParentTask(parent);
        }

        if (dto.getIdDeveloppeur() != null) {
            Developpeur dev = (Developpeur) userRepository.findById(dto.getIdDeveloppeur())
                    .orElseThrow(() -> new EntityNotFoundException("Developpeur not found"));

            task.setDeveloppeur(dev);
        } else {
            task.setDeveloppeur(null);
        }
task.setStatus(EStauts.AFaire);
        taskRepository.save(task);

        return taskMapper.toTaskResponseDTO(task);
    }
    public TaskResponseDTO updateTask(Long taskId, TaskUpdateDTO dto) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));

        taskMapper.updateTask(dto, task);

        taskRepository.save(task);
        return taskMapper.toTaskResponseDTO(task);
    }
    public TaskResponseDTO deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));
        taskRepository.delete(task);
        return taskMapper.toTaskResponseDTO(task);
    }
    public TaskResponseDTO assignerTache(Long taskId,Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if((user.getRole()!= ERole.devloppeur)) {
            throw new IllegalArgumentException("User is not a developpeur");
        }
        System.out.println(user instanceof Developpeur);
        Developpeur dev = (Developpeur) user;
        if(!(task.getProjet().getEquipe().contains(dev))){
            throw new IllegalArgumentException("Developpeur not part of project team");
        }

        task.setDeveloppeur(dev);
        taskRepository.save(task);
        return taskMapper.toTaskResponseDTO(task);
    }
    TaskResponseDTO getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));
        return taskMapper.toTaskResponseDTO(task);
    }
    public List<TaskResponseDTO> getTachesPrincipalesByProjet(Long projetId) {
        return taskRepository.findByProjetId(projetId).stream().filter(task->task.getParentTask()==null)
                .toList().stream().map(task->taskMapper.toTaskResponseDTO(task)).toList();
    }
    public List<TaskResponseDTO> getSubTaches(Long taskId) {
        return taskRepository.findByParentTaskId(taskId).stream().map(task->taskMapper.toTaskResponseDTO(task)).toList();
    }
    public List<TreeTaskDTO> getTreeTasks(Long projetId) {

        List<Task> tasks = taskRepository.findByProjetId(projetId)
                .stream()
                .filter(task -> task.getParentTask() == null)
                .toList();

        List<TreeTaskDTO> treeTasks = new ArrayList<>();

        for (Task task : tasks) {

            List<Task> subTasks = taskRepository.findByParentTaskId(task.getId());

            List<TreeTaskDTO> subTreeTasks = new ArrayList<>();

            for (Task subTask : subTasks) {
                subTreeTasks.add(TreeTaskDTO.builder()
                        .id(subTask.getId())
                        .name(subTask.getTitre())
                        .status(subTask.getStatus())
                        .progress(subTask.getProgress())
                        .mere(task.getId())
                        .estParent(false)
                        .children(null)
                        .build());
            }

            treeTasks.add(TreeTaskDTO.builder()
                    .id(task.getId())
                    .name(task.getTitre())
                    .status(task.getStatus())
                    .progress(task.getProgress())
                    .mere(null)
                    .estParent(true)
                    .children(subTreeTasks)
                    .build());
        }

        return treeTasks;
    }
    public List<TaskResponseDTO> getTaskByDeveloppeur(Long developpeurId) {
        Developpeur dev;
        dev =(Developpeur) userRepository.findById(developpeurId).orElseThrow(() -> new EntityNotFoundException("Task not found"));
        return dev.getSubTasks().stream().map(t->taskMapper.toTaskResponseDTO(t)).collect(Collectors.toList());
    }
    public List<TaskResponseDTO> getTaskEnRetards(Long idprojet) {
        LocalDate aujourdhui = LocalDate.now();
        return taskRepository.findByProjetIdAndDateFinBeforeAndStatusNot(idprojet,aujourdhui, EStauts.Terminee)
                .stream().map(task->taskMapper.toTaskResponseDTO(task)).toList();

    }
    public List<TaskResponseDTO> getAllTasks() {
        return taskRepository.findAll().stream().map(task->taskMapper.toTaskResponseDTO(task)).toList();
    }
    public TaskResponseDTO updateStatus(Long taskId, EStauts eStauts) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));

        TaskUpdateDTO dto = new TaskUpdateDTO();
        System.out.println();
        dto.setStatus(eStauts);
        taskMapper.updateTask(dto, task);
        taskRepository.save(task);
        System.out.println("task updateddddddddddddddddddddddddd");
        return taskMapper.toTaskResponseDTO(task);

    }
    public List<TaskResponseDTO> getTasksInReviewByChefDeProjet(Long chefId) {
        return taskRepository.findByProjetChefDeProjetIdAndStatus(chefId, EStauts.aVerifie).stream().map(t->taskMapper.toTaskResponseDTO(t)).toList();
    }

}
