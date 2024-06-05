package com.example.backend.dto;

import com.example.backend.model.BookingStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class BookingDto {
    private int id;
    private List<Integer> seatId;
    private String customerEmail;
    private String code;
    private BookingStatus status;
    private String movieTitle;
    private LocalDate date;
    private LocalTime startTime;
    private String hallName;
}
