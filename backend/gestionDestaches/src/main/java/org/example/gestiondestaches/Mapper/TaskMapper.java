package org.example.gestiondestaches.Mapper;

import org.example.gestiondestaches.DTO.TaskDTO.TaskCreateDTO;
import org.example.gestiondestaches.DTO.TaskDTO.TaskResponseDTO;
import org.example.gestiondestaches.DTO.TaskDTO.TaskUpdateDTO;
import org.example.gestiondestaches.entite.Task;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface TaskMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "developpeur", ignore = true)
  @Mapping(target = "projet", ignore = true)
  @Mapping(target = "parentTask", ignore = true)
  @Mapping(target = "subTasks", ignore = true)
  @Mapping(target = "fichiers", ignore = true)
  Task toTask(TaskCreateDTO dto);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "developpeur", ignore = true)
  @Mapping(target = "projet", ignore = true)
  @Mapping(target = "parentTask", ignore = true)
  void updateTask(TaskUpdateDTO dto, @MappingTarget Task task);

  @Mapping(source = "developpeur.id", target = "idDeveloppeur")
  @Mapping(source = "projet.id", target = "idProjet")
  TaskResponseDTO toTaskResponseDTO(Task task);
}