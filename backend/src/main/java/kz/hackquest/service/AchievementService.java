package kz.hackquest.service;

import kz.hackquest.model.Achievement;
import kz.hackquest.repository.AchievementRepository;
import org.springframework.stereotype.Service;

@Service
public class AchievementService {

    private final AchievementRepository achievementRepository;

    public AchievementService(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    public void unlockAchievement(Long userId,
                                  String name,
                                  String description) {

        if (!achievementRepository.existsByUserIdAndName(userId, name)) {

            Achievement achievement = new Achievement();

            achievement.setUserId(userId);
            achievement.setName(name);
            achievement.setDescription(description);

            achievementRepository.save(achievement);
        }
    }
}
