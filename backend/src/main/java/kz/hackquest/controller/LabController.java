package kz.hackquest.controller;

import kz.hackquest.model.Lab;
import kz.hackquest.repository.LabRepository;
import org.springframework.web.bind.annotation.*;
import kz.hackquest.model.LabAttempt;
import kz.hackquest.repository.LabAttemptRepository;
import kz.hackquest.repository.UserRepository;
import kz.hackquest.service.AchievementService;

import java.util.HashMap;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/api/labs")
@CrossOrigin(origins = "http://localhost:5173")
public class LabController {

    private final LabRepository labRepository;
    private final LabAttemptRepository labAttemptRepository;
    private final AchievementService achievementService;
    private final UserRepository userRepository;


    public LabController(
        LabRepository labRepository,
        LabAttemptRepository labAttemptRepository,
        UserRepository userRepository,
        AchievementService achievementService
) {
    this.labRepository = labRepository;
    this.labAttemptRepository = labAttemptRepository;
    this.userRepository = userRepository;
    this.achievementService = achievementService;
}
    

    @GetMapping
    public List<Lab> getAllLabs() {
        return labRepository.findAll();
    }

    @GetMapping("/{id}")
    public Lab getLabById(@PathVariable Long id) {
        return labRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Лабораторная работа не найдена"));
    }

    @PostMapping("/admin")
    public Lab createLab(@RequestBody Lab lab) {
        return labRepository.save(lab);
    }

    @PutMapping("/admin/{id}")
    public Lab updateLab(@PathVariable Long id, @RequestBody Lab newLab) {
        Lab lab = labRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Лабораторная работа не найдена"));

        lab.setTitle(newLab.getTitle());
        lab.setCategory(newLab.getCategory());
        lab.setDifficulty(newLab.getDifficulty());
        lab.setDescription(newLab.getDescription());
        lab.setBriefing(newLab.getBriefing());
        lab.setVulnerableCode(newLab.getVulnerableCode());
        lab.setHint(newLab.getHint());
        lab.setCorrectAnswer(newLab.getCorrectAnswer());
        lab.setPoints(newLab.getPoints());
        lab.setTimeLimit(newLab.getTimeLimit());

        return labRepository.save(lab);
    }

    @DeleteMapping("/admin/{id}")
    public void deleteLab(@PathVariable Long id) {
        labRepository.deleteById(id);
    }

@PostMapping("/{id}/submit")
public Map<String, Object> submitLab(
        @PathVariable Long id,
        @RequestBody Map<String, String> body) {

    Lab lab = labRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Лаборатория не найдена"));

    String payload = body.get("payload");

    payload = payload == null ? "" : payload.trim();

boolean success =
        payload.equals("' OR '1'='1") ||
        payload.equals("' OR 1=1 --") ||
        payload.equals("admin' --") ||
        payload.equals("' OR 'a'='a") ||
        payload.equals("' OR '1'='1' --");

    LabAttempt attempt = new LabAttempt();

    attempt.setLabId(id);
    attempt.setUserId(1L); // пока временно
    attempt.setPayload(payload);
    attempt.setSuccess(success);
    attempt.setEarnedPoints(success ? lab.getPoints() : 0);

    labAttemptRepository.save(attempt);

    Map<String, Object> response = new HashMap<>();

    response.put("success", success);

    Long userId = 1L; // Временный userId, заменить на реальный из аутентификации

    if (success) {

    response.put("success", true);
    response.put("message",
            "Authentication bypass successful");
    response.put("terminal",
            """
            > Выполняю SQL-запрос...
            > Подключение к базе данных...
            > Проверка учетных данных...
            > Доступ администратора получен!
            > +200 XP
            """);

    response.put("points", lab.getPoints());

    achievementService.unlockAchievement(
        userId,
        "First Blood",
        "Complete your first laboratory."
);

achievementService.unlockAchievement(
        userId,
        "SQL Injection Master",
        "Successfully exploit SQL Injection."
);

achievementService.unlockAchievement(
        userId,
        "Lab Beginner",
        "Finish one laboratory."
);

achievementService.unlockAchievement(
        userId,
        "Cyber Rookie",
        "Complete 5 laboratories."
);
achievementService.unlockAchievement(
        userId,
        "Junior Pentester",
        "Complete 10 laboratories."
);
achievementService.unlockAchievement(
        userId,
        "Bug Hunter",
        "Complete 20 laboratories."
);

} else {

    response.put("success", false);
    response.put("message",
            "SQL syntax error");

    response.put("terminal",
            """
            > Выполняю SQL-запрос...
            > Подключение к серверу...
            > Ошибка аутентификации
            > Доступ запрещён
            """);

    response.put("points", 0);

}

    return response;
}
}