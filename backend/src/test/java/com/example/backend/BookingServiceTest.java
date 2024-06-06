package com.example.backend;

import com.example.backend.dto.BookingDto;
import com.example.backend.model.*;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.SessionRepository;
import com.example.backend.service.BookingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private SessionRepository sessionRepository;

    @Spy
    @InjectMocks
    private BookingService bookingService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetBookingByCode_BookingExists() {
        Booking booking = createTestBooking();
        when(bookingRepository.findByCode("testCode")).thenReturn(Optional.of(booking));

        BookingDto bookingDto = bookingService.getBookingByCode("testCode");

        assertNotNull(bookingDto);
        assertEquals(booking.getId(), bookingDto.getId());
        verify(bookingRepository, times(1)).findByCode("testCode");
    }

    @Test
    public void testGetBookingByCode_BookingNotFound() {
        when(bookingRepository.findByCode("testCode")).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> {
            bookingService.getBookingByCode("testCode");
        });

        verify(bookingRepository, times(1)).findByCode("testCode");
    }

    @Test
    public void testCancelBooking_BookingValid() {
        Booking booking = createTestBooking();
        booking.setStatus(BookingStatus.WAŻNY);
        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

        BookingDto bookingDto = bookingService.cancelBooking(1L);

        assertNotNull(bookingDto);
        assertEquals(BookingStatus.SKASOWANY, bookingDto.getStatus());
        verify(bookingRepository, times(1)).findById(1L);
        verify(bookingRepository, times(1)).save(booking);
    }

    @Test
    public void testCancelBooking_BookingNotValid() {
        Booking booking = createTestBooking();
        booking.setStatus(BookingStatus.NIEWAŻNY);
        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

        assertThrows(ResponseStatusException.class, () -> {
            bookingService.cancelBooking(1L);
        });

        verify(bookingRepository, times(1)).findById(1L);
        verify(bookingRepository, times(0)).save(booking);
    }

    @Test
    public void testUpdateBookingStatus() {
        Booking booking = createTestBooking();
        booking.setStatus(BookingStatus.NOWY);
        booking.getSession().setDate(LocalDate.now().minusDays(1));
        when(bookingRepository.save(booking)).thenReturn(booking);

        Booking updatedBooking = bookingService.updateBookingStatus(booking);

        assertNotNull(updatedBooking);
        assertNotEquals(BookingStatus.NOWY, updatedBooking.getStatus());
        assertEquals(BookingStatus.NIEWAŻNY, updatedBooking.getStatus());
        verify(bookingRepository, times(1)).save(booking);
    }
    @Test
    public void testAddBooking_SessionExists() {
        Booking booking = createTestBooking();
        booking.setSession(null);
        booking.setSessionId(1L);

        Session session = createTestSession();
        session.setId(1);

        when(sessionRepository.findById(1L)).thenReturn(Optional.of(session));
        when(bookingRepository.save(booking)).thenReturn(booking);

        BookingDto bookingDto = bookingService.addBooking(booking);

        assertNotNull(bookingDto);
        assertEquals(booking.getId(), bookingDto.getId());
        verify(sessionRepository, times(1)).findById(1L);
        verify(bookingRepository, times(1)).save(booking);
    }

    @Test
    public void testAddBooking_SessionNotFound() {
        Booking booking = createTestBooking();
        booking.setSession(null);
        booking.setSessionId(1L);

        when(sessionRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> {
            bookingService.addBooking(booking);
        });

        verify(sessionRepository, times(1)).findById(1L);
        verify(bookingRepository, times(0)).save(booking);
    }

    private Booking createTestBooking() {
        Booking booking = new Booking();
        booking.setId(1);
        booking.setCode("testCode");
        booking.setSeatId(List.of(1, 2));
        booking.setCustomerEmail("test@example.com");
        booking.setStatus(BookingStatus.NOWY);

        Movie movie = new Movie();
        movie.setTitle("Film");

        Hall hall = new Hall();
        hall.setName("Sala");

        Session session = new Session();
        session.setMovie(movie);
        session.setHall(hall);
        session.setDate(LocalDate.now().plusDays(1));
        session.setStartTime(LocalTime.now().plusHours(1));
        session.setEndTime(LocalTime.now().plusHours(3));
        booking.setSession(session);

        return booking;
    }
    private Session createTestSession() {
        Movie movie = new Movie();
        movie.setTitle("Film");

        Hall hall = new Hall();
        hall.setName("Sala");

        Session session = new Session();
        session.setId(1);
        session.setMovie(movie);
        session.setHall(hall);
        session.setDate(LocalDate.now().plusDays(1));
        session.setStartTime(LocalTime.now().plusHours(1));
        session.setEndTime(LocalTime.now().plusHours(3));

        return session;
    }

}
