package com.example.backend;
import com.example.backend.model.Hall;
import com.example.backend.service.MovieService;

import com.example.backend.model.Movie;
import com.example.backend.model.Session;
import com.example.backend.repository.MovieRepository;
import com.example.backend.repository.SessionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class MovieServiceTest {

    @Mock
    private MovieRepository movieRepository;

    @Mock
    private SessionRepository sessionRepository;

    @InjectMocks
    private MovieService movieService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllMovies() {
        List<Movie> mockMovies = Arrays.asList(
                new Movie(1L, "Movie 1", "Description 1", 120, "url1", "trailerUrl1", 10.0, "2022-01-01", "Production 1", "Director 1", "Genre 1"),
                new Movie(2L, "Movie 2", "Description 2", 90, "url2", "trailerUrl2", 12.0, "2022-01-02", "Production 2", "Director 2", "Genre 2")
        );

        when(movieRepository.findAll()).thenReturn(mockMovies);

        List<Movie> result = movieService.getAllMovies();
        assertEquals(2, result.size());
        assertEquals("Movie 1", result.get(0).getTitle());
        assertEquals("Movie 2", result.get(1).getTitle());
    }

    @Test
    public void testGetAllMovies_NoMovies() {
        when(movieRepository.findAll()).thenReturn(Collections.emptyList());

        List<Movie> result = movieService.getAllMovies();
        assertTrue(result.isEmpty());
    }

    @Test
    public void testGetMovieById() {
        Movie mockMovie = new Movie(1L, "Movie 1", "Description 1", 120, "url1", "trailerUrl1", 10.0, "2022-01-01", "Production 1", "Director 1", "Genre 1");

        when(movieRepository.findById(1L)).thenReturn(Optional.of(mockMovie));

        Movie result = movieService.getMovieById(1L);
        assertEquals("Movie 1", result.getTitle());

        when(movieRepository.findById(2L)).thenReturn(Optional.empty());

        Movie resultNotFound = movieService.getMovieById(2L);
        assertNull(resultNotFound);
    }

    @Test
    public void testGetMovieById_NullId() {
        Movie result = movieService.getMovieById(null);
        assertNull(result);
    }

    @Test
    public void testGetAllSessions() {
        Movie mockMovie = new Movie(1L, "Movie 1", "Description 1", 120, "url1", "trailerUrl1", 10.0, "2022-01-01", "Production 1", "Director 1", "Genre 1");
        Hall mockHall = new Hall(1L, "Main Hall", 100);
        List<Session> mockSessions = Arrays.asList(
                new Session(1, mockMovie, LocalDate.of(2022, 1, 1), LocalTime.of(10, 0), LocalTime.of(12, 0), mockHall),
                new Session(2, mockMovie, LocalDate.of(2022, 1, 2), LocalTime.of(12, 0), LocalTime.of(14, 0), mockHall)
        );

        when(sessionRepository.findAll()).thenReturn(mockSessions);

        List<Session> result = movieService.getAllSessions();
        assertEquals(2, result.size());
        assertEquals("Movie 1", result.get(0).getMovie().getTitle());
        assertEquals("Movie 1", result.get(1).getMovie().getTitle());
    }

    @Test
    public void testGetAllSessions_NoSessions() {
        when(sessionRepository.findAll()).thenReturn(Collections.emptyList());

        List<Session> result = movieService.getAllSessions();
        assertTrue(result.isEmpty());
    }

    @Test
    public void testSearchMoviesByTitle() {
        List<Movie> mockMovies = Arrays.asList(
                new Movie(1L, "Star Wars", "Description 1", 120, "url1", "trailerUrl1", 10.0, "2022-01-01", "Production 1", "Director 1", "Genre 1"),
                new Movie(2L, "Star Trek", "Description 2", 90, "url2", "trailerUrl2", 12.0, "2022-01-02", "Production 2", "Director 2", "Genre 2")
        );

        when(movieRepository.findByTitleStartingWithIgnoreCase("Star")).thenReturn(mockMovies);

        List<Movie> result = movieService.searchMoviesByTitle("Star");
        assertEquals(2, result.size());
        assertEquals("Star Wars", result.get(0).getTitle());
        assertEquals("Star Trek", result.get(1).getTitle());
    }

    @Test
    public void testSearchMoviesByTitle_NoMatches() {
        when(movieRepository.findByTitleStartingWithIgnoreCase("Nonexistent")).thenReturn(Collections.emptyList());

        List<Movie> result = movieService.searchMoviesByTitle("Nonexistent");
        assertTrue(result.isEmpty());
    }

    @Test
    public void testSearchMoviesByTitle_NullTitle() {
        List<Movie> result = movieService.searchMoviesByTitle(null);
        assertTrue(result.isEmpty());
    }

    @Test
    public void testGetAllMovies_Exception() {
        when(movieRepository.findAll()).thenThrow(new RuntimeException("Database error"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            movieService.getAllMovies();
        });

        assertEquals("Database error", exception.getMessage());
    }

    @Test
    public void testGetMovieById_Exception() {
        when(movieRepository.findById(1L)).thenThrow(new RuntimeException("Database error"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            movieService.getMovieById(1L);
        });

        assertEquals("Database error", exception.getMessage());
    }

    @Test
    public void testGetAllSessions_Exception() {
        when(sessionRepository.findAll()).thenThrow(new RuntimeException("Database error"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            movieService.getAllSessions();
        });

        assertEquals("Database error", exception.getMessage());
    }

    @Test
    public void testSearchMoviesByTitle_Exception() {
        when(movieRepository.findByTitleStartingWithIgnoreCase("Star")).thenThrow(new RuntimeException("Database error"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            movieService.searchMoviesByTitle("Star");
        });

        assertEquals("Database error", exception.getMessage());
    }
}


