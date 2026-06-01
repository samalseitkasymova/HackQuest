package kz.hackquest.controller;

import kz.hackquest.model.Mission;
import kz.hackquest.repository.MissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/missions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MissionController {

    private final MissionRepository missionRepository;

    @GetMapping
    public List<Mission> getAllMissions() {
        return missionRepository.findAll();
    }

    @PostMapping
    public Mission createMission(@RequestBody Mission mission) {
        if (mission.getCompleted() == null) mission.setCompleted(false);
        if (mission.getUnlocked() == null) mission.setUnlocked(true);
        return missionRepository.save(mission);
    }

    @DeleteMapping("/{id}")
    public void deleteMission(@PathVariable Long id) {
        missionRepository.deleteById(id);
    }
}