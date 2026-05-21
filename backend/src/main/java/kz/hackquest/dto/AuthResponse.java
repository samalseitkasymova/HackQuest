package kz.hackquest.dto;
public record AuthResponse(Long id, String username, String email, String role, Integer points, Integer level) {}
