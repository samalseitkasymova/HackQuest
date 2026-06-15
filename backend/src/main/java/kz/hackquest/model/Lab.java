package kz.hackquest.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "labs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lab {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String category;

    @Column(length = 2000)
    private String description;

    private String difficulty;

    private Integer duration;

    private Integer xpReward;

    @Column(length = 5000)
    private String briefing;

    @Column(length = 2000)
    private String hint;

    @Column(length = 5000)
    private String vulnerableCode;

    @Column(length = 2000)
    private String correctPayload;

    private Boolean enabled;

    @PrePersist
    public void onCreate() {
        if (enabled == null) enabled = true;
    }
}
