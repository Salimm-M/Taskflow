package org.example.gestiondestaches.DTO.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateDTO {
    private String email;
    private String nom;
    private String prenom;
    private String adresse;
    private String numTelephone;


}
