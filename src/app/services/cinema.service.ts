import { Injectable } from '@angular/core';
import { Movie, Session, Ticket } from '../models/movie.model';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  // private movies: Movie[] = [
  //   { id: 1, title: 'Movie 1', description: 'Description 1', duration: 120 }
  // ];
  //
  // private sessions: Session[] = [
  //   { id: 1, movieId: 1, date: '2024-05-10', startTime: '20:00', endTime: '22:00', hall: 1 }
  // ];
  //
  private tickets: Ticket[] = [
    { id: 1, sessionId: 1, seatNumbers: [1, 2, 3] }
    // Dodaj więcej biletów
  ];

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
  // getMovies(): Movie[] {
  //   console.log(this.movies);
  //   return this.movies;
  // }
  //
  // getSessions(): Session[] {
  //   return this.sessions;
  // }

  getTickets(): Ticket[] {
    return this.tickets;
  }
}
