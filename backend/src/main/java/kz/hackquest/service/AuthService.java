package kz.hackquest.service;

import kz.hackquest.dto.*;
import kz.hackquest.model.User;
import kz.hackquest.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {
        if (request.username() == null || request.username().trim().length() < 3) {
            throw new RuntimeException("Username должен быть минимум 3 символа");
        }
        if (request.username().matches("\\d+")) {
            throw new RuntimeException("Username не должен состоять только из цифр");
        }
        if (userRepository.existsByUsername(request.username())) throw new RuntimeException("Такой username уже есть");
        if (userRepository.existsByEmail(request.email())) throw new RuntimeException("Такой email уже есть");

        User user = User.builder()
                .username(request.username().trim())
                .email(request.email().trim().toLowerCase())
                .password(passwordEncoder.encode(request.password()))
                .role("USER")
                .points(0)
                .level(1)
                .build();
        return toResponse(userRepository.save(user));
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email().trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Неверный пароль");
        }
        return toResponse(user);
    }

    public AuthResponse toResponse(User user) {
        return new AuthResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole(), user.getPoints(), user.getLevel());
    }
}
