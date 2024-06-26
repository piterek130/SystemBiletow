package com.example.backend.repository;

import com.example.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByCode(String code);

    List<Booking> findBookingsBySession_Id(int sessionId);
}
