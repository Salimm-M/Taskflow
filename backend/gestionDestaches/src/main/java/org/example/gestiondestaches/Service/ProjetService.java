package org.example.gestiondestaches.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.example.gestiondestaches.DTO.ProjetDTO.ProjetCreateDTO;
import org.example.gestiondestaches.DTO.ProjetDTO.ProjetRespenseDTO;
import org.example.gestiondestaches.DTO.ProjetDTO.ProjetUpdateDTO;
import org.example.gestiondestaches.DTO.UserDTO.UserResponseDTO;
import org.example.gestiondestaches.Mapper.ProjetMapper;
import org.example.gestiondestaches.Mapper.UserMapper;
import org.example.gestiondestaches.Repository.ProjetRepository;
import org.example.gestiondestaches.Repository.UserRepository;
import org.example.gestiondestaches.entite.*;
import org.example.gestiondestaches.enummiration.EStauts;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjetService {
    private final UserMapper userMapper;
    private ProjetRepository projetRepository;
    private ProjetMapper projetMapper;
    private UserRepository userRepository;

    public List<ProjetRespenseDTO> getAllProjets() {
        return  projetRepository.findAll().stream().map(projet->projetMapper.toProjetResponseDTO(projet)).toList();


    }
    public List<ProjetRespenseDTO> getProjetsByChef(Long chefId){
        return projetRepository.findByChefDeProjetId(chefId).stream().map(project -> projetMapper.toProjetResponseDTO(project)).toList();


    }
    public  List<ProjetRespenseDTO> getProjetsByDev(Long userId){
        return projetRepository.findByEquipeId(userId).stream().map(project -> projetMapper.toProjetResponseDTO(project)).toList();
    }
    public ProjetRespenseDTO getProjetById(Long id){
        return projetMapper.toProjetResponseDTO(projetRepository.findById(id).get());
    }
    public ProjetRespenseDTO ajoutProjet(ProjetCreateDTO projetCreateDTO){
        Projet projet = projetMapper.toProjet(projetCreateDTO);
        ChefDeProjet chefDeProjet = (ChefDeProjet) userRepository.findById(projetCreateDTO.getChefDeProjetId()).orElseThrow(()-> new EntityNotFoundException("ChefDeProjet not found"));
        projet.setChefDeProjet(chefDeProjet);
        projet=projetRepository.save(projet);
        return projetMapper.toProjetResponseDTO(projet);
    }
    public ProjetRespenseDTO updateProjet(Long idProjet, ProjetUpdateDTO projetUpdateDTO){
        Projet projet = projetRepository.findById(idProjet).orElseThrow(()-> new EntityNotFoundException("Projet not found"));
        projetMapper.updateProjet(projetUpdateDTO, projet);

        System.out.println();
        ChefDeProjet chefDeProjet = (ChefDeProjet) userRepository.findById(projetUpdateDTO.getChefDeProjetId()).orElseThrow(()->new EntityNotFoundException("ched not found"));
        projet.setChefDeProjet(chefDeProjet);
        projet=projetRepository.save(projet);
        return projetMapper.toProjetResponseDTO(projet);

    }
    public String ajoutEquipe(Long idProjet,Long idUser){
        Projet projet=projetRepository.findById(idProjet).orElseThrow(()-> new EntityNotFoundException("Projet not found"));
        User u=userRepository.findById(idUser).orElseThrow(()-> new EntityNotFoundException("User not found"));
        Developpeur developpeur = Developpeur.builder()
                .id(u.getId())
                .nom(u.getNom())
                .prenom(u.getPrenom())
                .email(u.getEmail())
                .build();
        projet.getEquipe().add(developpeur);
        projet=projetRepository.save(projet);
        return "User ajouté";
    }
    public List<UserResponseDTO> getEquipes(Long idProjet){
        Projet p=projetRepository.findById(idProjet).orElseThrow(()-> new EntityNotFoundException("Projet not found"));
        return p.getEquipe().stream().map(u->userMapper.toResponseDTO(u)).toList();
    }
    public ProjetRespenseDTO deleteProjet(Long idProjet){
        Projet projet=projetRepository.findById(idProjet).orElseThrow(()-> new EntityNotFoundException("Projet not found"));
        projetRepository.delete(projet);
        return projetMapper.toProjetResponseDTO(projet);
    }
    public ProjetRespenseDTO ajoutMembreEquipe(Long IdProjet, Long idDev){
        Developpeur developpeur=(Developpeur) userRepository.findById(idDev).orElseThrow(()-> new EntityNotFoundException("Developpeur not found"));
        Projet projet=projetRepository.findById(IdProjet).orElseThrow(()-> new EntityNotFoundException("Projet not found"));
        if(projet.getEquipe().contains(developpeur)){
            throw new RuntimeException("Ce développeur est déjà dans l'équipe");
        }
        projet.getEquipe().add(developpeur);
        projetRepository.save(projet);
        System.out.println(projet.getEquipe());
        return projetMapper.toProjetResponseDTO(projet);


    }
    public ProjetRespenseDTO deleteMembreEquipe(Long IdProjet, Long idDev){
        Developpeur developpeur=(Developpeur) userRepository.findById(idDev).orElseThrow(()-> new EntityNotFoundException("Developpeur not found"));
        Projet projet=projetRepository.findById(IdProjet).orElseThrow(()-> new EntityNotFoundException("Projet not found"));
        if(!projet.getEquipe().contains(developpeur)){
            throw new RuntimeException("Ce développeur n existe pas dans l'équipe");
        }
        projet.getEquipe().remove(developpeur);
        projetRepository.save(projet);
        return projetMapper.toProjetResponseDTO(projet);
    }
    @Transactional
    public int calculerAvancement(Long idProjet) {

        Projet projet = projetRepository.findById(idProjet)
                .orElseThrow(() -> new EntityNotFoundException("Projet not found"));

        // كل الـ subTasks متاع المشروع
        List<Task> subTasks = projet.getTasks().stream()
                .flatMap(task -> task.getSubTasks().stream())
                .toList();

        if (subTasks.isEmpty()) {
            projet.setProgres(0);
            return 0;
        }

        long nbSubTasks = subTasks.size();

        long nbSubTasksTerminees = subTasks.stream()
                .filter(sub -> sub.getStatus() == EStauts.Terminee)
                .count();
        subTasks.stream().forEach(subTask -> {
            System.out.println("//////////////"+subTask.getStatus());
        });
        System.out.println("nbSubTasksTermineeeeeeeeeeeee = " + nbSubTasksTerminees);

        int avancement = Math.toIntExact(
                Math.round((nbSubTasksTerminees * 100.0) / nbSubTasks)
        );

        projet.setProgres(avancement);
        projetRepository.save(projet);

        return avancement;
    }




}
