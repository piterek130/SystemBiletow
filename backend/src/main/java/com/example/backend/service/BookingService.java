package com.example.backend.service;

import com.example.backend.dto.BookingDto;
import com.example.backend.model.Booking;
import com.example.backend.model.BookingStatus;
import com.example.backend.model.Session;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SessionRepository sessionRepository;

    public BookingDto getBookingByCode(String code) {
        Booking booking = bookingRepository.findByCode(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking with code " + code + " not found"));
        return toDto(booking);
    }

    public List<Integer> getBookedSeats(int sessionId) {
        List<Integer> bookedSeats = new ArrayList<>();
        List<Booking> bookings = bookingRepository.findBookingsBySession_Id(sessionId);

        for(Booking booking: bookings) {
            bookedSeats.addAll(booking.getSeatId());
        }
        return bookedSeats;
    }
    public BookingDto toDto(Booking booking) {

        Booking updatedBooking = updateBookingStatus(booking);

        BookingDto dto = new BookingDto();
        dto.setId(updatedBooking.getId());
        dto.setSeatId(updatedBooking.getSeatId());
        dto.setCustomerEmail(updatedBooking.getCustomerEmail());
        dto.setCode(updatedBooking.getCode());
        dto.setStatus(updatedBooking.getStatus());
        dto.setMovieTitle(updatedBooking.getSession().getMovie().getTitle());
        dto.setDate(updatedBooking.getSession().getDate());
        dto.setStartTime(updatedBooking.getSession().getStartTime());
        dto.setHallName(updatedBooking.getSession().getHall().getName());
        return dto;
    }

    public BookingDto cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        if (isBookingCancellable(booking)) {
            booking.setStatus(BookingStatus.SKASOWANY);
            bookingRepository.save(booking);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Booking is not valid");
        }

        return toDto(booking);
    }

    public Booking updateBookingStatus(Booking booking) {
        BookingStatus currentStatus = getBookingStatus(booking.getSession(), booking.getStatus());
        if (booking.getStatus() != currentStatus) {
            booking.setStatus(currentStatus);
            bookingRepository.save(booking);
        }
        return booking;
    }

    public static BookingStatus getBookingStatus(Session session, BookingStatus status) {
        if (status == BookingStatus.SKASOWANY) {
            return BookingStatus.SKASOWANY;
        }
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sessionStart = LocalDateTime.of(session.getDate(), session.getStartTime());
        LocalDateTime sessionEnd = LocalDateTime.of(session.getDate(), session.getEndTime());

        if (now.isBefore(sessionStart.minus(15, ChronoUnit.MINUTES))) {
            return BookingStatus.NOWY;
        } else if (now.isBefore(sessionEnd)) {
            return BookingStatus.WAŻNY;
        } else {
            return BookingStatus.NIEWAŻNY;
        }
    }

    public static boolean isBookingCancellable(Booking booking) {
        return booking.getStatus() == BookingStatus.WAŻNY;
    }

    public BookingDto addBooking(Booking booking) {
        booking.setStatus(BookingStatus.NOWY);
        try {
            if (booking.getSession() == null && booking.getSessionId() != null) {
                Session session = sessionRepository.findById(booking.getSessionId())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Session not found"));
                booking.setSession(session);
            }
            Booking savedBooking = bookingRepository.save(booking);
            return toDto(savedBooking);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error creating booking", e);
        }
    }
}
