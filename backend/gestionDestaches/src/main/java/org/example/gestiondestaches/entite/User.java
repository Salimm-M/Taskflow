package org.example.gestiondestaches.entite;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.example.gestiondestaches.enummiration.ERole;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Locale;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)


public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUser")
    private Long id;

    @Column(nullable = false)
    private String nom;
    @Column(nullable = false)
    private String prenom;
    @Column(nullable = false ,unique = true,columnDefinition = "TEXT")
    private String email;
    @Column(columnDefinition = "TEXT")
    private String motDePasse;
    @Column(nullable = false ,unique = true)


    private String numTelephone;
    @Column(columnDefinition = "DATE")
    private LocalDate dateDeNaissance;
    @Enumerated(EnumType.STRING)
    private ERole role;


    private String  adresse;
    @CreationTimestamp
    private LocalDateTime dateDeCreation;

    @UpdateTimestamp
    private LocalDateTime dateDeModification;

    @Lob
    @Column(name = "photo", columnDefinition = "LONGBLOB")
    private byte[] photo;




}
