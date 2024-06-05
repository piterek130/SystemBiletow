package com.example.backend.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Movie {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;
  private String description;
  private int duration;
  private String imageUrl;
  private String trailerUrl;
  private double price;
  private String releaseDate;
  private String production;
  private String director;
  private String genres;
}
