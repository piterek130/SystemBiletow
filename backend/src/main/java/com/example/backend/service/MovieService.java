package com.example.backend.service;

import com.example.backend.model.Movie;
import com.example.backend.model.Session;
import com.example.backend.repository.MovieRepository;
import com.example.backend.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

  @Autowired
  private MovieRepository movieRepository;

  @Autowired
  private SessionRepository sessionRepository;

  public List<Movie> getAllMovies() {
    return movieRepository.findAll();
  }

  public Movie getMovieById(Long id) {
    return movieRepository.findById(id).orElse(null);
  }

  public List<Session> getAllSessions() { return sessionRepository.findAll(); }

  public List<Movie> searchMoviesByTitle(String title) {
    return movieRepository.findByTitleStartingWithIgnoreCase(title);
  }
}
