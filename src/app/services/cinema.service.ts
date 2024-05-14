import { Injectable } from '@angular/core';
import { Movie, Session, Ticket, Hall, Booking } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

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
