import { Component, OnInit, NgModule } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CinemaService } from '../services/cinema.service';
import { Movie, Booking, Hall, Session } from '../models/movie.model';
import { ActivatedRoute } from '@angular/router';

export interface BookingDetails {
  id: number;
  sessionId: number;
  movieTitle: string;
  sessionDate: string;
  sessionTime: string;
  hallName: string;
  seatsCount: number;
  seatNumbers: number[];
  code: string;
}

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.css'
})
export class MyTicketsComponent{
  bookingDetails: BookingDetails[] = [];
  bookings: Booking[] = [];
  movies: Movie[] = [];
  sessions: Session[] = [];
  halls: Hall[] = [];
  selectedSession: Session | null = null;
  selectedHall: Hall | null = null;
  selectedMovie: Movie | null = null;
  expandedBookingIds: number[] = [];

  constructor(private cinemaService: CinemaService){}

  async ngOnInit() {
    const bookings = await this.cinemaService.getBookings();
    this.bookings = bookings.filter(b => b.customerId === 501);
    this.sessions = await this.cinemaService.getSessions();
    this.movies = await this.cinemaService.getMovies();
    this.halls = await this.cinemaService.getHalls();

    this.bookingDetails = bookings.filter(b => b.customerId === 501).map(booking => {
      const session = this.sessions.find(s => s.id === booking.sessionId);
      const movie = this.movies.find(m => m.id === session?.movieId);
      const hall = this.halls.find(h => h.id === session?.hallId);
      return {
        id: booking.id,
        sessionId: booking.sessionId,
        movieTitle: movie ? movie.title : 'Unknown',
        sessionDate: session ? session.date : 'Unknown',
        sessionTime: session ? session.startTime : 'Unknown',
        hallName: hall ? hall.name : 'Unknown',
        seatsCount: booking.seatId.length,
        seatNumbers: booking.seatId,
        code: booking.code
      };
    });
  }

  toggleDetails(bookingId: number): void {
    const index = this.expandedBookingIds.indexOf(bookingId);
    if (index > -1) {
      this.expandedBookingIds.splice(index, 1);
    } else {
      this.expandedBookingIds.push(bookingId);
    }
  }

  isDetailsVisible(ticketId: number): boolean {
    return this.expandedBookingIds.includes(ticketId);
  }

}

