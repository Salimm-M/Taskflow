package org.example.gestiondestaches.Mapper;

import org.example.gestiondestaches.DTO.ProjetDTO.ProjetCreateDTO;
import org.example.gestiondestaches.DTO.ProjetDTO.ProjetRespenseDTO;
import org.example.gestiondestaches.DTO.ProjetDTO.ProjetUpdateDTO;
import org.example.gestiondestaches.DTO.UserDTO.UserCreateDTO;
import org.example.gestiondestaches.entite.Projet;
import org.example.gestiondestaches.entite.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ProjetMapper {

    Projet toProjet(ProjetCreateDTO projetCreateDTO);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProjet(ProjetUpdateDTO projetUpdateDTO,@MappingTarget Projet projet);
    @Mapping(source = "chefDeProjet.id", target = "chefDeProjetId")
    ProjetRespenseDTO  toProjetResponseDTO(Projet projet);
}
