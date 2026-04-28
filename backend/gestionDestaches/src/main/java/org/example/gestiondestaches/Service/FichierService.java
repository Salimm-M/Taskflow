package org.example.gestiondestaches.Service;

import lombok.AllArgsConstructor;
import org.example.gestiondestaches.DTO.FichierDTO;
import org.example.gestiondestaches.DTO.FichierResponseDTO;
import org.example.gestiondestaches.Mapper.FichierMapper;
import org.example.gestiondestaches.Repository.FichierRepositiory;
import org.example.gestiondestaches.Repository.TaskRepository;
import org.example.gestiondestaches.entite.Fichier;
import org.example.gestiondestaches.entite.Task;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Service
@AllArgsConstructor
public class FichierService {
    private FichierRepositiory fichierRepositiory;
    private TaskRepository taskRepository;
    private FichierMapper fichierMapper;

    public List<FichierDTO> ajouterFichier(List<MultipartFile> files, Long idTache) {

        Task task = taskRepository.findById(idTache)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        return files.stream().map(file -> {
            try {
                Fichier fichier = Fichier.builder()
                        .nom(file.getOriginalFilename())
                        .type(file.getContentType())
                        .data(file.getBytes())
                        .task(task)
                        .build();

                Fichier saved = fichierRepositiory.save(fichier);

                return FichierDTO.builder()
                        .id(saved.getId())
                        .nom(saved.getNom())
                        .type(saved.getType())
                        .idTache(task.getId())
                        .build();

            } catch (IOException e) {
                throw new RuntimeException("Erreur upload file", e);
            }
        }).toList();
    }
    public List<FichierResponseDTO> getFileByTaskId(Long taskId) {
        return fichierRepositiory.findByTaskId(taskId).stream().map(f->fichierMapper.toFichierResponseDto(f)).toList();

    }
    public byte[] afficherFichier(Long fichierId) {
        return fichierRepositiory.findById(fichierId).getData();

    }
}
