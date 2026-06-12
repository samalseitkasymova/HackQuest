package kz.hackquest.controller;

import kz.hackquest.model.LabAttempt;
import kz.hackquest.repository.LabAttemptRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lab-attempts")
@CrossOrigin(origins = "*")
public class LabAttemptController {

    private final LabAttemptRepository labAttemptRepository;

    public LabAttemptController(LabAttemptRepository labAttemptRepository) {
        this.labAttemptRepository = labAttemptRepository;
    }

    @GetMapping("/user/{userId}")
    public List<LabAttempt> getUserAttempts(@PathVariable Long userId) {

        return labAttemptRepository.findByUserId(userId);

    }

}