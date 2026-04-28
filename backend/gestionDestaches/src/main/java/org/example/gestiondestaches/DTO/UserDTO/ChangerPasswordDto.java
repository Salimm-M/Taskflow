package org.example.gestiondestaches.DTO.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChangerPasswordDto {
    private String mtpCourante;
    private String mtpNew;

}
