package org.example.gestiondestaches.entite;

import jakarta.persistence.*;

import lombok.*;
import org.example.gestiondestaches.enummiration.EPeriorite;
import org.example.gestiondestaches.enummiration.EStauts;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String titre;


    @Column(columnDefinition = "TEXT")
    private String description;


    @ManyToOne
    @JoinColumn(name = "parent_task_id")
    private Task parentTask;

    @OneToMany(mappedBy = "parentTask", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Task> subTasks = new ArrayList<>();



    @ManyToOne
    @JoinColumn(name = "developpeur_id")
    private Developpeur developpeur;

    @ManyToOne
    @JoinColumn(name = "projet_id")
    private Projet projet;

    @CreationTimestamp
    private LocalDateTime dateCreation;

    @UpdateTimestamp
    private LocalDateTime dateModification;


    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EStauts status = EStauts.AFaire;


    @Column(nullable = false)
    private int progress = 0;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    private List<Fichier> fichiers = new ArrayList<>();



    @Column(nullable = false)
    private EPeriorite periorite;

    private LocalDate dateFin;
}

