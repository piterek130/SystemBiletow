import { Injectable } from '@angular/core';
import { Movie, Session, Ticket, Hall, Booking  } from '../models/movie.model';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  private moviesSource = new BehaviorSubject<Movie[]>([]);
  currentMovies = this.moviesSource.asObservable();
  constructor() {}
  changeMovies(movies: Movie[]) {
    this.moviesSource.next(movies);
  }
  async getMovies(): Promise<Movie[]> {
    const response = await fetch('/assets/data.json');
    const data = await response.json();
    return data.movies as Movie[];
  }

  async getMovies1(): Promise<Movie[]> {
    const response = await fetch('/assets/movies.json');
    const data = await response.json();
    return data.movies;
  }


  async getSessions(): Promise<Session[]> {
    const response = await fetch('/assets/data.json');
    const data = await response.json();
    return data.sessions as Session[];
  }
  async getMovieById(id: number): Promise<Movie> {
    const movies = await this.getMovies();
    const movie = movies.find(movie => movie.id === id);
    if (!movie) {
      throw new Error(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async getMoviesByGenre(genre: string): Promise<Movie[]> {
    try {
      const response = await fetch('/assets/data.json');
      const data = await response.json();
      if (!data.movies) {
        throw new Error("No movies found in the dataset.");
      }
      return data.movies.filter((m: Movie) => m.genres && m.genres.includes(genre));
    } catch (error) {
      console.error("Failed to fetch movies by genre:", error);
      return []; // Zwraca pustą tablicę w przypadku błędu
    }
  }

  async getHalls(): Promise<Hall[]> {
    const response = await fetch('/assets/data.json');
    const data = await response.json();
    return data.halls as Hall[];
  }

  async getTickets(): Promise<Ticket[]> {
    const response = await fetch('/assets/data.json');
    const data = await response.json();
    return data.tickets as Ticket[];
  }

  async getBookings(): Promise<Booking[]> {
    const response = await fetch('/assets/data.json');
    const data = await response.json();
    return data.bookings as Booking[];
  }
}
