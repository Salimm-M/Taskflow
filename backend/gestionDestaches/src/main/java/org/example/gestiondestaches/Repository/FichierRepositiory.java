package org.example.gestiondestaches.Repository;

import org.example.gestiondestaches.DTO.FichierDTO;
import org.example.gestiondestaches.entite.Fichier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FichierRepositiory  extends JpaRepository<Fichier, Integer> {
public List<Fichier> findByTaskId(Long id);
public Fichier findById(Long id);
}
