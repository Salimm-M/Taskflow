package org.example.gestiondestaches.DTO.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageRefusDTO {
   private String taskTitle;
     private String reason;
    private String email;

    private String nomDev;


}

