package org.example.gestiondestaches.entite;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor

@Entity
@SuperBuilder
@DiscriminatorValue("admin")
public class Admin extends User {



}
