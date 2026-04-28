package org.example.gestiondestaches.entite;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fichier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private String type;

    @Lob
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;
}