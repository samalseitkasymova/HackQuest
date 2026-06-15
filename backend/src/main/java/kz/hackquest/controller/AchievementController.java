package kz.hackquest.controller;

import kz.hackquest.model.Achievement;
import kz.hackquest.repository.AchievementRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "*")
public class AchievementController {

    private final AchievementRepository achievementRepository;

    public AchievementController(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    @GetMapping("/user/{userId}")
    public List<Achievement> getUserAchievements(
            @PathVariable Long userId) {

        return achievementRepository.findByUserId(userId);
    }
}
