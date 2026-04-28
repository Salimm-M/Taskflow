package org.example.gestiondestaches.DTO.TaskDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.gestiondestaches.entite.Task;
import org.example.gestiondestaches.enummiration.EPeriorite;
import org.example.gestiondestaches.enummiration.EStauts;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponseDTO {
    private Long id;
    private String titre;
    private String description;
    private EStauts status;
    private Long idParentTask;
    private int progress;
    private EPeriorite periorite;
    private Long idDeveloppeur;
    private Long idProjet;
    private LocalDate dateFin;
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;
}
