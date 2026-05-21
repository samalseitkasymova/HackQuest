package kz.hackquest.repository;

import kz.hackquest.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findTop20ByOrderByPointsDescCreatedAtAsc();
}
