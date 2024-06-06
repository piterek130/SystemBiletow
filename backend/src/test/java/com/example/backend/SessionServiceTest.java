package com.example.backend;

import com.example.backend.dto.SessionDto;
import com.example.backend.model.Hall;
import com.example.backend.model.Movie;
import com.example.backend.model.Session;
import com.example.backend.repository.SessionRepository;
import com.example.backend.service.BookingService;
import com.example.backend.service.SessionService;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class SessionServiceTest {
    @Mock
    private SessionRepository sessionRepository;
    @Mock
    private BookingService bookingService;

    @InjectMocks
    private SessionService sessionService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
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

        List<Session> result = sessionService.getAllSessions();
        assertEquals(2, result.size());
        assertEquals("Movie 1", result.get(0).getMovie().getTitle());
        assertEquals("Movie 1", result.get(1).getMovie().getTitle());
    }

    @Test
    public void testGetAllSessions_NoSessions() {
        when(sessionRepository.findAll()).thenReturn(Collections.emptyList());

        List<Session> result = sessionService.getAllSessions();
        assertTrue(result.isEmpty());
    }

    @Test
    public void testGetAllSessions_Exception() {
        when(sessionRepository.findAll()).thenThrow(new RuntimeException("Database error"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            sessionService.getAllSessions();
        });

        assertEquals("Database error", exception.getMessage());
    }

    @Test
    public void testGetSessionsByMovieId() {
        Movie mockMovie = new Movie(1L, "Movie 1", "Description 1", 120, "url1", "trailerUrl1", 10.0, "2022-01-01", "Production 1", "Director 1", "Genre 1");
        Hall mockHall = new Hall(1L, "Main Hall", 100);
        List<Session> mockSessions = Arrays.asList(
                new Session(1, mockMovie, LocalDate.of(2022, 1, 1), LocalTime.of(10, 0), LocalTime.of(12, 0), mockHall),
                new Session(2, mockMovie, LocalDate.of(2022, 1, 2), LocalTime.of(12, 0), LocalTime.of(14, 0), mockHall)
        );

        when(sessionRepository.findSessionsByMovie_Id(1)).thenReturn(mockSessions);
        when(bookingService.getBookedSeats(1)).thenReturn(Arrays.asList(1, 2, 3));
        when(bookingService.getBookedSeats(2)).thenReturn(Arrays.asList(4, 5));

        List<SessionDto> result = sessionService.getSessionsByMovieId(1);

        assertEquals(2, result.size());
        assertEquals("Movie 1", result.get(0).getMovieTitle());
        assertEquals("Movie 1", result.get(1).getMovieTitle());
        assertEquals(Arrays.asList(1, 2, 3), result.get(0).getBookedSeats());
        assertEquals(Arrays.asList(4, 5), result.get(1).getBookedSeats());
    }

    @Test
    public void testGetSessionsByMovieId_NoSessions() {
        when(sessionRepository.findSessionsByMovie_Id(1)).thenReturn(Collections.emptyList());

        List<SessionDto> result = sessionService.getSessionsByMovieId(1);
        assertTrue(result.isEmpty());
    }

    @Test
    public void testGetSessionsByMovieId_Exception() {
        when(sessionRepository.findSessionsByMovie_Id(1)).thenThrow(new RuntimeException("Database error"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            sessionService.getSessionsByMovieId(1);
        });

        assertEquals("Database error", exception.getMessage());
    }
}
