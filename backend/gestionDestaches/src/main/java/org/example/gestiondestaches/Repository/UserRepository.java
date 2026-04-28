package org.example.gestiondestaches.Repository;

import org.example.gestiondestaches.entite.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long>
{
    public User findByEmail(String email);

    boolean existsByEmail(String email);
}
