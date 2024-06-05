package com.example.backend.controller;

import com.example.backend.dto.BookingDto;
import com.example.backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/code/{code}")
    public ResponseEntity<BookingDto> getBookingByCode(@PathVariable String code) {
        try {
            BookingDto bookingDto =  bookingService.getBookingByCode(code);
            return new ResponseEntity<>(bookingDto, HttpStatus.OK);
        } catch (ResponseStatusException e) {
            return new ResponseEntity<>(null, e.getStatusCode());
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<BookingDto> cancelBooking(@PathVariable Long id) {
        try {
            BookingDto updatedBooking = bookingService.cancelBooking(id);
            return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
        } catch (ResponseStatusException e) {
            return new ResponseEntity<>(null, e.getStatusCode());
        }
    }


}
