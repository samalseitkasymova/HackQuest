package kz.hackquest.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 40)
    private String username;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private Integer points;

    private Integer level;

    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        if (role == null) role = UserRole.PLAYER;
        if (points == null) points = 0;
        if (level == null) level = 1;
        if (createdAt == null) createdAt = LocalDateTime.now();
    }
}
