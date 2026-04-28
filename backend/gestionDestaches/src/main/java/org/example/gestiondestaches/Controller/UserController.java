package org.example.gestiondestaches.Controller;

import lombok.RequiredArgsConstructor;
import org.example.gestiondestaches.DTO.UserDTO.*;
import org.example.gestiondestaches.Service.UserService;
import org.example.gestiondestaches.entite.User;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserCreateDTO dto) {
        System.out.println(dto.getMotDePasse());
        return ResponseEntity.ok(userService.createUser(dto));
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUser());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id,
                                                      @RequestBody UserUpdateDTO dto) {
        return ResponseEntity.ok(userService.UpdateUser(id, dto));
    }
    @PutMapping("admin/{id}")
    public ResponseEntity<UserResponseDTO> updateUserByAdmin(@PathVariable Long id,
                                                      @RequestBody UserUpdateByAdminDTO dto) {
        return ResponseEntity.ok(userService.UpdateUserByadmin(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.DeleteUser(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/{id}/photo")
    public ResponseEntity<String> uploadPhoto(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) throws IOException {

        userService.savePhoto(id, file.getBytes());
        return ResponseEntity.ok("Photo uploaded!");
    }
    @GetMapping("/{id}/photo")
    public ResponseEntity<byte[]> getPhoto(@PathVariable Long id) {
        byte[] photo = userService.getPhoto(id);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(photo);
    }
    @PostMapping("/connexion")
    public boolean connexion(@RequestBody UserConnexion userConnexion){
        System.out.println("hfvgjhbkj"+userConnexion.toString());
        System.out.println(userService.connexion(userConnexion));
        return userService.connexion(userConnexion);
    }
    @GetMapping("/{email}/user")
    public ResponseEntity<UserResponseDTO> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok( userService.getUserByEmail(email));
    }
@GetMapping("/projet/chef/{id}")
    public ResponseEntity<List<UserResponseDTO>> getUserByChef(@PathVariable Long id){

        return ResponseEntity.ok(userService.getDeveloppeursByChef(id));
}
@PostMapping("/{id}/password")
    public ResponseEntity<Boolean> changePassword(@PathVariable Long id ,@RequestBody ChangerPasswordDto mtp){
    System.out.println("mot de pass"+mtp);
        return ResponseEntity.ok(userService.changePassword(id,mtp.getMtpNew(),mtp.getMtpCourante()));
}
@GetMapping("/projet/dev/{id}")
    public ResponseEntity<List<UserResponseDTO>> getDevByproject(@PathVariable Long id){
        return ResponseEntity.ok(userService.getDeveloppeursByProject(id));


}

}
