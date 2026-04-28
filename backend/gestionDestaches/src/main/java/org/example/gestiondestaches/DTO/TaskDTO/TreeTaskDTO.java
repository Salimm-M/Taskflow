package org.example.gestiondestaches.DTO.TaskDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.gestiondestaches.enummiration.EStauts;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TreeTaskDTO {
    private Long id;
    private String name;
    private EStauts status;
    private Integer progress;
    private List<TreeTaskDTO> children;
    private Long mere;
    private Boolean estParent;
}
