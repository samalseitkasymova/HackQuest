package kz.hackquest.controller;

import kz.hackquest.model.User;
import kz.hackquest.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import kz.hackquest.model.UserRole;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserRepository userRepository;

    @GetMapping("/users")
    public List<User> users() {
        return userRepository.findAll();
    }

    @PutMapping("/users/{id}/make-admin")
    public User makeAdmin(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow();

        user.setRole(UserRole.ADMIN);

        return userRepository.save(user);
    }

    @PutMapping("/users/{id}/make-player")
    public User makePlayer(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow();

        user.setRole(UserRole.PLAYER);

        return userRepository.save(user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}