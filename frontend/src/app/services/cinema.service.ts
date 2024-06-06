import { Injectable } from '@angular/core';
import { Movie, Session, Hall, Booking  } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

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

  async getHalls(): Promise<Hall[]> {
    const response = await fetch('/assets/data.json');
    const data = await response.json();
    return data.halls as Hall[];
  }

  async getBookings(): Promise<Booking[]> {
    const response = await fetch('/assets/data.json');
    const data = await response.json();
    return data.bookings as Booking[];
  }

}
