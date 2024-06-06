package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class SessionDto {
    private int id;
    private String movieTitle;
    private double ticketPrice;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String hallName;
    private int hallCapacity;
    private List<Integer> bookedSeats;
}
