package org.example.gestiondestaches.Controller;

import lombok.RequiredArgsConstructor;
import org.example.gestiondestaches.DTO.ProjetDTO.ProjetCreateDTO;
import org.example.gestiondestaches.DTO.ProjetDTO.ProjetRespenseDTO;
import org.example.gestiondestaches.DTO.ProjetDTO.ProjetUpdateDTO;
import org.example.gestiondestaches.DTO.UserDTO.UserResponseDTO;
import org.example.gestiondestaches.Service.ProjetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProjetController {

    private final ProjetService projetService;

    @GetMapping
    public ResponseEntity<List<ProjetRespenseDTO>> getAllProjets() {
        return ResponseEntity.ok(projetService.getAllProjets());
    }
    @GetMapping("/equipe/{id}")
    public ResponseEntity<List<UserResponseDTO>> getEquipe(@PathVariable Long id){
        return ResponseEntity.ok(projetService.getEquipes(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjetRespenseDTO> getProjetById(@PathVariable Long id) {
        return ResponseEntity.ok(projetService.getProjetById(id));
    }

    @GetMapping("/chef/{idChef}")
    public ResponseEntity<List<ProjetRespenseDTO>> getProjetsByChef(@PathVariable Long idChef) {
        return ResponseEntity.ok(projetService.getProjetsByChef(idChef));
    }

    @GetMapping("/developpeur/{idDev}")
    public ResponseEntity<List<ProjetRespenseDTO>> getProjetsByDev(@PathVariable Long idDev) {
        return ResponseEntity.ok(projetService.getProjetsByDev(idDev));
    }
    @PostMapping("/{idProjet}/users/{idUser}")
    public ResponseEntity<String> ajoutEquipe(
            @PathVariable Long idProjet,
            @PathVariable Long idUser
    ) {
        String result = projetService.ajoutEquipe(idProjet, idUser);
        return ResponseEntity.ok(result);
    }
    @PostMapping
    public ResponseEntity<ProjetRespenseDTO> createProjet(
                                                          @RequestBody ProjetCreateDTO dto) {
        return ResponseEntity.ok(projetService.ajoutProjet(dto));
    }

    @PutMapping("/{idProjet}")
    public ResponseEntity<ProjetRespenseDTO> updateProjet(@PathVariable Long idProjet,
                                                          @RequestBody ProjetUpdateDTO dto) {
        return ResponseEntity.ok(projetService.updateProjet(idProjet, dto));
    }

    @DeleteMapping("/{idProjet}")
    public ResponseEntity<ProjetRespenseDTO> deleteProjet(@PathVariable Long idProjet) {
        return ResponseEntity.ok(projetService.deleteProjet(idProjet));
    }

    @PutMapping("/{idProjet}/equipe/{idDev}")
    public ResponseEntity<ProjetRespenseDTO> addMembreEquipe(@PathVariable Long idProjet,
                                                             @PathVariable Long idDev) {
        return ResponseEntity.ok(projetService.ajoutMembreEquipe(idProjet, idDev));
    }

    @DeleteMapping("/{projetId}/equipe/{devId}")
    public ResponseEntity<ProjetRespenseDTO> removeMembreEquipe(@PathVariable Long projetId,
                                                                @PathVariable Long idDev) {
        return ResponseEntity.ok(projetService.deleteMembreEquipe(projetId, idDev));
    }

    @PostMapping("/{projetId}/avancement")
    public void calculerAvancement(@PathVariable Long projetId) {
      ResponseEntity.ok(projetService.calculerAvancement(projetId));
    }

}
