package org.example.gestiondestaches.Controller;

import lombok.RequiredArgsConstructor;
import org.example.gestiondestaches.DTO.FichierDTO;
import org.example.gestiondestaches.DTO.FichierResponseDTO;
import org.example.gestiondestaches.Repository.FichierRepositiory;
import org.example.gestiondestaches.Service.FichierService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/fichier")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/")
public class FichierController {
    private final FichierService fichierService;
    @PostMapping
    public ResponseEntity<List<FichierDTO>> ajouterFichiers(
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam("idTache") Long idTache) {

        return ResponseEntity.ok(fichierService.ajouterFichier(files, idTache));
    }
    @GetMapping("/Task/{idTask}")
    public ResponseEntity<List<FichierResponseDTO>> getFichier(@PathVariable("idTask") Long idTask) {
        return ResponseEntity.ok(fichierService.getFileByTaskId(idTask));
    }
    @GetMapping("/{id}")
    public ResponseEntity<byte[]>  afficherFichier(@PathVariable Long id) {
        return ResponseEntity.ok(fichierService.afficherFichier(id));
    }

}
