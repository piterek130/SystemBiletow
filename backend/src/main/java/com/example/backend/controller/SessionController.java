package com.example.backend.controller;

import com.example.backend.model.Movie;
import com.example.backend.model.Session;
import com.example.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public List<Session> getAllSessions() {
        return movieService.getAllSessions();
    }
}
