package org.example.gestiondestaches.entite;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@DiscriminatorValue("developpeur")
public class Developpeur  extends User{
    @OneToMany(mappedBy = "developpeur",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Task> subTasks = new ArrayList<>();
    @ManyToMany(mappedBy = "equipe")
    private List<Projet> projetsParticipes = new ArrayList<>();

}
