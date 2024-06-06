package com.example.backend.controller;

import com.example.backend.dto.SessionDto;
import com.example.backend.model.Session;
import com.example.backend.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @GetMapping
    public List<Session> getAllSessions() {
        return sessionService.getAllSessions();
    }

    @GetMapping("{movieId}")
    public List<SessionDto> getSessionsByMovieId(@PathVariable int movieId) {
        return sessionService.getSessionsByMovieId(movieId);
    }
}
