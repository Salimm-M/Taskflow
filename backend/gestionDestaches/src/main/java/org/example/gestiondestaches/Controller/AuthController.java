package org.example.gestiondestaches.Controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.example.gestiondestaches.DTO.UserDTO.UserConnexion;
import org.example.gestiondestaches.Service.PasswordService;
import org.example.gestiondestaches.Service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200",allowCredentials = "true")
public class AuthController {
    private final UserService userService;
    @PostMapping("/api/users/connexionS")
    public boolean connexion(@RequestBody UserConnexion userConnexion, HttpSession session){

        if(userService.connexion(userConnexion)){
            session.setAttribute("userConnexion",userConnexion.getEmail());
        }
        return userService.connexion(userConnexion);
    }
    @PostMapping("/api/users/logout")
    public String deconnexion(HttpSession session){
        session.invalidate();
        return "logout";
    }
    @GetMapping("/test")
    public String test(){
        PasswordService service = new PasswordService();
        return service.hashPassword("salim123");
    }
}
