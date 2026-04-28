package org.example.gestiondestaches.Mapper;
import org.example.gestiondestaches.DTO.UserDTO.UserCreateDTO;
import org.example.gestiondestaches.DTO.UserDTO.UserResponseDTO;
import org.example.gestiondestaches.DTO.UserDTO.UserUpdateDTO;
import org.example.gestiondestaches.entite.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.example.gestiondestaches.DTO.UserDTO.UserUpdateByAdminDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(UserCreateDTO userCreateDTO);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void toEntity(UserCreateDTO dto, @MappingTarget User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)

    void toEntity(UserUpdateDTO userUpdateDTO, @MappingTarget User user);
    UserResponseDTO  toResponseDTO(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)

    void toEntity(UserUpdateByAdminDTO dto, @MappingTarget User user);

}
