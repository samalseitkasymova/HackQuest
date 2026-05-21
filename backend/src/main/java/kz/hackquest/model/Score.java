package kz.hackquest.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "scores")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Score {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String username;
    private String gameName;
    private Integer points;
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() { createdAt = LocalDateTime.now(); }
}
