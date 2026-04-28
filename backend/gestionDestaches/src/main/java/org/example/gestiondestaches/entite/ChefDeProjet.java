package org.example.gestiondestaches.entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
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

@DiscriminatorValue("chef_de_projet")
public class ChefDeProjet extends User {
    @OneToMany(mappedBy = "chefDeProjet",fetch = FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Projet> projets = new ArrayList<>();


}
