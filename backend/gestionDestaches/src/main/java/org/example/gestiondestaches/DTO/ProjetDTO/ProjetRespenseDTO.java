package org.example.gestiondestaches.DTO.ProjetDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjetRespenseDTO {
    private Long id;
    private String titre;
    private String description;
    private int progres;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Long chefDeProjetId;
}
