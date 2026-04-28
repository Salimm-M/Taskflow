package org.example.gestiondestaches.config;

import org.example.gestiondestaches.Repository.UserRepository;
import org.example.gestiondestaches.entite.User;
import org.example.gestiondestaches.enummiration.ERole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.time.LocalDate;

@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    CommandLineRunner init(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        return args -> {

            if (!userRepository.existsByEmail(("admin@gmail.com"))) {

                User user = new User();

                user.setNom("Admin");
                user.setPrenom("System");
                user.setEmail("admin@gmail.com");
                user.setNumTelephone("12345678");
                user.setAdresse("Tunis");
                user.setRole(ERole.admin);
                user.setDateDeNaissance(LocalDate.parse("2000-01-01"));
                user.setMotDePasse(
                        passwordEncoder.encode("admin123")
                );

                userRepository.save(user);

                System.out.println("Admin créé automatiquement !");
            }

        };
    }
}