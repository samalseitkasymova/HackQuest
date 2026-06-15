package kz.hackquest.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "missions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private String difficulty;

    private Integer xpReward;

    private Integer duration;

    private Boolean enabled;

    @PrePersist
    public void onCreate() {
        if (enabled == null) enabled = true;
    }
}
