package org.example.gestiondestaches.Controller;

import lombok.RequiredArgsConstructor;
import org.example.gestiondestaches.DTO.UserDTO.MessageRefusDTO;
import org.example.gestiondestaches.Service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/")
public class EmailController {
    private final EmailService emailService;
    @PostMapping("/refus-tache")
    public ResponseEntity<Map<String, String>> rejectTask(@RequestBody MessageRefusDTO dto) {

        emailService.envoyerEmailDeRefus(dto);

        return ResponseEntity.ok(Map.of("message", "Email envoyé avec succès"));
    }
}
