package org.example.gestiondestaches.DTO.TaskDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.gestiondestaches.entite.Task;
import org.example.gestiondestaches.enummiration.EPeriorite;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskCreateDTO {
    private String titre;
    private String description;
    private Long idParentTask;
    private  Long idDeveloppeur;
    private Long idProjet;
    private int progress;
    private EPeriorite periorite;


}
