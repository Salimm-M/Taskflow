package org.example.gestiondestaches.Repository;

import org.example.gestiondestaches.DTO.UserDTO.UserResponseDTO;
import org.example.gestiondestaches.entite.Projet;
import org.example.gestiondestaches.entite.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjetRepository extends JpaRepository<Projet, Long>
{
    public List<Projet>  findByChefDeProjetId(Long chefDeProjet_id);
    public List<Projet>  findByEquipeId(Long user_id);
    @Query("""
    SELECT DISTINCT u
    FROM Projet p
    JOIN p.equipe u
    WHERE p.chefDeProjet.id = :chefId
      AND u.id != :chefId
""")

    List<User> findTeamWithoutChef(@Param("chefId") Long chefId);


}
