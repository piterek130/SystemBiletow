package com.example.backend.controller;

import com.example.backend.model.Movie;
import com.example.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

  @Autowired
  private MovieService movieService;

  @GetMapping
  public List<Movie> getAllMovies() {
    return movieService.getAllMovies();
  }

  @GetMapping("/{id}")
  public Movie getMovieById(@PathVariable Long id) {
    return movieService.getMovieById(id);
  }

  @GetMapping("/genre/{genre}")
  public List<Movie> getMoviesByGenre(@PathVariable String genre) {
    return movieService.getAllMovies().stream()
            .filter(movie -> genre.equalsIgnoreCase(movie.getGenres()))
            .collect(Collectors.toList());
  }

}
