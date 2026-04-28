package org.example.gestiondestaches.entite;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

@Builder
public class Projet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idProjet")
    private Long id;

    @Column(nullable = false)
    private String titre;
    @Column(nullable = false)
    private String description;

    private int progres=0;

    @Column(nullable = false,columnDefinition = "DATE")
    private LocalDate dateDebut;
    @Column(nullable = false,columnDefinition = "DATE")
    private LocalDate dateFin;

    @ManyToOne
    @JoinColumn(name = "id_ChefDeProjet")
    private ChefDeProjet chefDeProjet;

    @OneToMany(mappedBy = "projet",cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();
    @ManyToMany
    @JoinTable(
            name = "projet_equipe",
            joinColumns = @JoinColumn(name = "projet_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<Developpeur> equipe = new ArrayList<>();





}
