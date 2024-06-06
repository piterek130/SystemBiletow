package com.example.backend.service;

import com.example.backend.dto.SessionDto;
import com.example.backend.model.Session;
import com.example.backend.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SessionService {
    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private BookingService bookingService;

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public List<SessionDto> getSessionsByMovieId(int movieId) {
        return sessionRepository.findSessionsByMovie_Id(movieId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public SessionDto toDto(Session session) {
        SessionDto sessionDto = new SessionDto();
        sessionDto.setId(session.getId());
        sessionDto.setMovieTitle(session.getMovie().getTitle());
        sessionDto.setTicketPrice(session.getMovie().getPrice());
        sessionDto.setDate(session.getDate());
        sessionDto.setStartTime(session.getStartTime());
        sessionDto.setEndTime(session.getEndTime());
        sessionDto.setHallName(session.getHall().getName());
        sessionDto.setHallCapacity(session.getHall().getCapacity());
        sessionDto.setBookedSeats(bookingService.getBookedSeats(session.getId()));
        return sessionDto;
    }
}
