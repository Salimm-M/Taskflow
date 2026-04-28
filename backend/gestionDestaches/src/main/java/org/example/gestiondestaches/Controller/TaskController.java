package org.example.gestiondestaches.Controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.gestiondestaches.DTO.FichierDTO;
import org.example.gestiondestaches.DTO.TaskDTO.TaskCreateDTO;
import org.example.gestiondestaches.DTO.TaskDTO.TaskResponseDTO;
import org.example.gestiondestaches.DTO.TaskDTO.TaskUpdateDTO;
import org.example.gestiondestaches.DTO.TaskDTO.TreeTaskDTO;
import org.example.gestiondestaches.Service.TaskService;
import org.example.gestiondestaches.enummiration.EStauts;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/")
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponseDTO> createTask(@RequestBody TaskCreateDTO dto) {
        TaskResponseDTO response = taskService.ajoutTask(dto);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> updateTask(
            @PathVariable Long id,
            @RequestBody TaskUpdateDTO dto) {
        TaskResponseDTO response = taskService.updateTask(id, dto);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> deleteTask(@PathVariable Long id) {
        TaskResponseDTO response = taskService.deleteTask(id);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/{idTask}/assigne/{idUser}")
    public ResponseEntity<TaskResponseDTO> assigneTask(@PathVariable Long idTask, @PathVariable Long idUser) {
        TaskResponseDTO response=taskService.assignerTache(idTask,idUser);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/projet/{projetId}/principales")
    public ResponseEntity<List<TaskResponseDTO>> getTachesPrincipalesByProjet(
            @PathVariable Long projetId) {
        return ResponseEntity.ok(taskService.getTachesPrincipalesByProjet(projetId));
    }
    @GetMapping("/{taskId}/subtasks")
    public ResponseEntity<List<TaskResponseDTO>> getSubTasks(
            @PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.getSubTaches(taskId));
    }
    @GetMapping("/developpeur/{developpeurId}")
    public ResponseEntity<List<TaskResponseDTO>> getTasksByDeveloppeur(
            @PathVariable Long developpeurId) {
        return ResponseEntity.ok(taskService.getTaskByDeveloppeur(developpeurId));
    }
    @GetMapping("/projet/{projetId}/retard")
    public ResponseEntity<List<TaskResponseDTO>> getLateTasks(
            @PathVariable Long projetId) {
        return ResponseEntity.ok(taskService.getTaskEnRetards(projetId));
    }
    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getAllTasks() {

        return ResponseEntity.ok(taskService.getAllTasks());
    }
    @PutMapping("/{id}/{statut}")
    public ResponseEntity<TaskResponseDTO> updateStatut(
            @PathVariable Long id,
            @PathVariable EStauts statut) {

        return ResponseEntity.ok(taskService.updateStatus(id, statut));
    }
    @GetMapping("/chef/{id}")
    public ResponseEntity<List<TaskResponseDTO>> getChefTasks(
            @PathVariable Long id){
        return ResponseEntity.ok(taskService.getTasksInReviewByChefDeProjet(id));
    }
    @GetMapping("/tree/{id}")
    public ResponseEntity<List<TreeTaskDTO>> getTasksByTree(
            @PathVariable Long id){
        return ResponseEntity.ok(taskService.getTreeTasks(id));
    }


}
