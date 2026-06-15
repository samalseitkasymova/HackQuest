package kz.hackquest.repository;

import kz.hackquest.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {

    boolean existsByTitle(String title);

}
