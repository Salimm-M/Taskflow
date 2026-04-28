package org.example.gestiondestaches.DTO;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FichierDTO {
    private Long id;

    private String nom;

    private String type;


    private byte[] data;
    private Long idTache;
}
