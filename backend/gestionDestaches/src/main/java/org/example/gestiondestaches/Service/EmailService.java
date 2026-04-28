package org.example.gestiondestaches.Service;

import lombok.AllArgsConstructor;
import org.example.gestiondestaches.DTO.UserDTO.MessageRefusDTO;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    public void envoyerEmailDeRefus(MessageRefusDTO  messageRefusDTO) {
        SimpleMailMessage msg=new SimpleMailMessage();
        msg.setTo(messageRefusDTO.getEmail());
        msg.setSubject("❌ Tâche refusée");

        msg.setText(
                "Bonjour "+messageRefusDTO.getNomDev()+" ,\n\n" +
                        "Votre tâche \"" + messageRefusDTO.getTaskTitle() + "\" a été refusée.\n\n" +
                        "📝 Raison : " + messageRefusDTO.getReason() + "\n\n" +
                        "Merci de corriger et de la soumettre à nouveau.\n\n" +
                        "Cordialement,\n" +
                        "TaskFlow Team"
        );
        this.mailSender.send(msg);
    }
}
