package kz.hackquest.controller;

import kz.hackquest.repository.UserRepository;
import kz.hackquest.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final AuthService authService;

    @GetMapping("/{id}")
    public Object getUser(@PathVariable Long id) {
        return userRepository.findById(id).map(authService::toResponse).orElse(null);
    }
}
