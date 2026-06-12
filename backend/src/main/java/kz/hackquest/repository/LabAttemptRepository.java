package kz.hackquest.repository;

import kz.hackquest.model.LabAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LabAttemptRepository extends JpaRepository<LabAttempt, Long> {

    List<LabAttempt> findByUserId(Long userId);

    List<LabAttempt> findByLabId(Long labId);

    List<LabAttempt> findByUserIdAndLabId(Long userId, Long labId);

}