package org.example.gestiondestaches.Mapper;

import org.example.gestiondestaches.DTO.FichierDTO;
import org.example.gestiondestaches.DTO.FichierResponseDTO;
import org.example.gestiondestaches.DTO.ProjetDTO.ProjetCreateDTO;
import org.example.gestiondestaches.entite.Fichier;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FichierMapper {
    Fichier toFichier(FichierDTO fichierDTO);
    @Mapping(source = "task.id",target = "idTache")
    FichierResponseDTO toFichierResponseDto(Fichier fichier);


}
