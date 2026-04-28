package org.example.gestiondestaches.Service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.gestiondestaches.DTO.UserDTO.*;
import org.example.gestiondestaches.Mapper.UserMapper;
import org.example.gestiondestaches.Repository.ProjetRepository;
import org.example.gestiondestaches.Repository.UserRepository;
import org.example.gestiondestaches.entite.*;
import org.example.gestiondestaches.enummiration.ERole;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ProjetRepository projetRepository;

    public UserResponseDTO createUser(UserCreateDTO dto){
        User u;
        PasswordService passwordService = new PasswordService();
        if(dto.getRole() == ERole.devloppeur){
            u = new Developpeur();
        } else if(dto.getRole() == ERole.chefDeProjet) {
            u = new ChefDeProjet();
        }else{
            u = new Admin();
        }
        userMapper.toEntity(dto, u);
        u.setMotDePasse(passwordService.hashPassword(dto.getMotDePasse()));
        userRepository.save(u);


        return userMapper.toResponseDTO(u);
    }


    public UserResponseDTO getUserById(Long id){
        User u= userRepository.findById(id)
                .orElseThrow(()->new RuntimeException("User not found"));
        return userMapper.toResponseDTO(u);
    }
    public List<UserResponseDTO> getAllUser(){
        return (userRepository.findAll()).stream().map(u -> userMapper.toResponseDTO(u)).collect(Collectors.toList());

    }


    public UserResponseDTO UpdateUser(Long id, UserUpdateDTO dto){
        User u= userRepository.findById(id)
                .orElseThrow(()->new RuntimeException("User not found"));
        userMapper.toEntity(dto,u);


        userRepository.save(u);
        return userMapper.toResponseDTO(u);

    }
    public UserResponseDTO UpdateUserByadmin(Long id, UserUpdateByAdminDTO dto){
        User u= userRepository.findById(id)
                .orElseThrow(()->new RuntimeException("User not found"));
        userMapper.toEntity(dto,u);
        


        userRepository.save(u);
        return userMapper.toResponseDTO(u);

    }
    @Transactional
    public  void DeleteUser(Long id){
        User u= userRepository.findById(id)
                .orElseThrow(()->new RuntimeException("User not found"));
        userRepository.delete(u);
    }

    public void savePhoto(Long userId, byte[] photo) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPhoto(photo);
        userRepository.save(user);
    }

    public byte[] getPhoto(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getPhoto();
    }
    public boolean connexion(UserConnexion userConnexion){
        PasswordService service = new PasswordService();
       User user=this.userRepository.findByEmail(userConnexion.getEmail());
        if (user != null && service.checkPassword(userConnexion.getMotDePasse(), user.getMotDePasse())) {
            return true;
        }
        return false;


    }
    public UserResponseDTO getUserByEmail(String email){
        User user = userRepository.findByEmail(email);
        return userMapper.toResponseDTO(user);
    }
    public List<UserResponseDTO> getDeveloppeursByProject(Long Id) {
        Projet projet=projetRepository.findById(Id).orElseThrow(()->new RuntimeException("Project not found"));
        return projet.getEquipe().stream().map(userMapper::toResponseDTO).collect(Collectors.toList());
    }

    public List<UserResponseDTO> getDeveloppeursByChef(Long chefId) {
        List<UserResponseDTO> users=new ArrayList<>();

        projetRepository.findByChefDeProjetId(chefId)
                .forEach(projet -> {
                    System.out.println("Projet ID: " + projet.getId());

                    projet.getEquipe().forEach(u -> {
                        System.out.println("User ID: " + u.getId() );
                        users.add(userMapper.toResponseDTO(u));
                    });
                });
        return users;

    }

    public boolean  changePassword(Long userId, String newPassword, String oldPassword){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        PasswordService service = new PasswordService();
        if (user != null && service.checkPassword(oldPassword, user.getMotDePasse())) {
            System.out.println("pass"+oldPassword+newPassword);
            user.setMotDePasse(newPassword);
            userRepository.save(user);
            return true;
        }
        return false;
    }


}
