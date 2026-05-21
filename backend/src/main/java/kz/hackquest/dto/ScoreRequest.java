package kz.hackquest.dto;
public record ScoreRequest(Long userId, String username, String gameName, Integer points) {}
