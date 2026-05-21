package kz.hackquest.controller;

import kz.hackquest.dto.ScoreRequest;
import kz.hackquest.model.Score;
import kz.hackquest.model.User;
import kz.hackquest.repository.ScoreRepository;
import kz.hackquest.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GameController {
    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;

    @PostMapping("/scores")
    public Score saveScore(@RequestBody ScoreRequest request) {
        User user = userRepository.findById(request.userId()).orElse(null);
        if (user != null) {
            user.setPoints(user.getPoints() + request.points());
            user.setLevel(1 + user.getPoints() / 100);
            userRepository.save(user);
        }
        return scoreRepository.save(Score.builder()
                .userId(request.userId())
                .username(request.username())
                .gameName(request.gameName())
                .points(request.points())
                .build());
    }

    @GetMapping("/leaderboard")
    public List<Score> leaderboard() {
        return scoreRepository.findTop20ByOrderByPointsDescCreatedAtAsc();
    }
}
