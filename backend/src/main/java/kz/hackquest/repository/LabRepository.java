package kz.hackquest.repository;

import kz.hackquest.model.Lab;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabRepository extends JpaRepository<Lab, Long> {
}