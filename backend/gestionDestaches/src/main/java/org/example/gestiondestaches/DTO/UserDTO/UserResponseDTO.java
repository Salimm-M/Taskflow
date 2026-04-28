package org.example.gestiondestaches.DTO.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.gestiondestaches.enummiration.ERole;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
    private Long id;
    private byte[] photo;
    private String nom;
    private String prenom;
    private String email;
    private ERole role;
    private String adresse;
    private String numTelephone;
    private LocalDate dateDeNaissance;
}
