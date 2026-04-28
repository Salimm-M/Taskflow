package org.example.gestiondestaches.DTO.UserDTO;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class UserCreateDTO {
    private String nom;
    private String prenom;


    private String email;
    private String motDePasse;
    @Enumerated(EnumType.STRING)
    private ERole role;
    private String adresse;
    private String numTelephone;
    private LocalDate dateDeNaissance;


}
