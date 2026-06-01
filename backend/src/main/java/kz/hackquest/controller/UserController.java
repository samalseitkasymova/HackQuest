package kz.hackquest.controller;

import kz.hackquest.model.User;
import kz.hackquest.repository.UserRepository;
import kz.hackquest.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import kz.hackquest.model.UserRole;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;
    private final AuthService authService;

    // Получить пользователя по ID
    @GetMapping("/{id}")
    public Object getUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(authService::toResponse)
                .orElse(null);
    }

    // Получить всех пользователей (для админки)
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Изменить роль пользователя
    @PutMapping("/{id}/role")
    public User updateRole(
            @PathVariable Long id,
            @RequestParam String role) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(UserRole.valueOf(role));

        return userRepository.save(user);
    }

    // Удалить пользователя
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
