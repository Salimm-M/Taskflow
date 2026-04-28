package org.example.gestiondestaches.DTO.TaskDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.gestiondestaches.enummiration.EPeriorite;
import org.example.gestiondestaches.enummiration.EStauts;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskUpdateDTO {
    private String titre;
    private String description;
    private EStauts status;
    private int progress;
    private EPeriorite periorite;
    private Long idDeveloppeur;
    private Long idProjet;
}
