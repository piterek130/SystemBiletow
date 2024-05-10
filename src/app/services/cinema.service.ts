import { Injectable } from '@angular/core';
import { Movie, Session, Ticket } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  // private movies: Movie[] = [
  //   { id: 1, title: 'Movie 1', description: 'Description 1', duration: 120 }
  //   // Dodaj więcej filmów
  // ];
  //
  // private sessions: Session[] = [
  //   { id: 1, movieId: 1, date: '2024-05-10', startTime: '20:00', endTime: '22:00', hall: 1 }
  //   // Dodaj więcej sesji
  // ];
  //
  private tickets: Ticket[] = [
    { id: 1, sessionId: 1, seatNumbers: [1, 2, 3] }
    // Dodaj więcej biletów
  ];

  constructor() { }

  async getMovies(): Promise<Movie[]> {
    const response = await fetch('/assets/data.json');
    const data = await response.json();
    return data.movies as Movie[];
  }

  async getSessions(): Promise<Session[]> {
    const response = await fetch('/assets/data.json');
    const data = await response.json();
    return data.sessions as Session[];
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
