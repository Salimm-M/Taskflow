package org.example.gestiondestaches.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FichierResponseDTO {
    private Long id;

    private String nom;

    private String type;



    private Long idTache;
}
