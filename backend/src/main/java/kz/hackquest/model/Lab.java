package kz.hackquest.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "labs")
public class Lab {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String category;

    private String difficulty;

    @Column(length = 2000)
    private String description;

    @Column(length = 5000)
    private String briefing;

    @Column(length = 5000)
    private String vulnerableCode;

    @Column(length = 2000)
    private String hint;

    private String correctAnswer;

    private Integer points;

    private Integer timeLimit;

    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        if (points == null) points = 100;
        if (timeLimit == null) timeLimit = 30;
    }

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getBriefing() { return briefing; }
    public void setBriefing(String briefing) { this.briefing = briefing; }

    public String getVulnerableCode() { return vulnerableCode; }
    public void setVulnerableCode(String vulnerableCode) { this.vulnerableCode = vulnerableCode; }

    public String getHint() { return hint; }
    public void setHint(String hint) { this.hint = hint; }

    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }

    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }

    public Integer getTimeLimit() { return timeLimit; }
    public void setTimeLimit(Integer timeLimit) { this.timeLimit = timeLimit; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}