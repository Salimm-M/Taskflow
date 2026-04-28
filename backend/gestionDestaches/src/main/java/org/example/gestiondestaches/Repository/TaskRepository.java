package org.example.gestiondestaches.Repository;

import org.aspectj.apache.bcel.util.Repository;
import org.example.gestiondestaches.entite.Task;
import org.example.gestiondestaches.enummiration.EStauts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long>
{
    List<Task> findByProjetId(Long projet_id);
    List<Task> findByParentTaskId(Long parentTaskId);
    List<Task> findByDeveloppeurId(Long developpeurId);
    List<Task> findByProjetIdAndDateFinBeforeAndStatusNot(Long projet_id, LocalDate date_fin, EStauts stauts);
    List<Task> findByProjetChefDeProjetIdAndStatus(Long chefId, EStauts status);
}
