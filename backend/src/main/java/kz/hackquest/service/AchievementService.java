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
                                  String title,
                                  String description) {

        if (!achievementRepository.existsByTitle(title)) {

            Achievement achievement = new Achievement();

            achievement.setTitle(title);
            achievement.setDescription(description);
            achievement.setXpReward(0);

            achievementRepository.save(achievement);
        }
    }
}
