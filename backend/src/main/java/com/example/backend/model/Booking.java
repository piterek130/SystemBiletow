package com.example.backend.model;

import com.example.backend.converter.SeatsConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private Session session;
    @Convert(converter = SeatsConverter.class)
    private List<Integer> seatId;

    private String customerEmail;

    private String code;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;
}
