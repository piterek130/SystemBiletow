import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Movie, Booking, Hall, Session  } from '../../models/movie.model';

import { NgFor } from '@angular/common';
@Component({
  selector: 'app-ticket-management',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './ticket-management.component.html',
  styleUrl: './ticket-management.component.css'
})
export class TicketManagementComponent implements OnInit {
  bookings: Booking[] = [];
  bookingCode: string = "";
  bookingDetails: any = null;
  ticketNotFound: boolean = false;
  booking: Booking | undefined;
  session: Session | undefined;
  movie: Movie | undefined;
  hall: Hall | undefined;

  constructor(private cinemaService: CinemaService) { }

  ngOnInit(): void {
  }

  async verifyTicket(bookingCode: String): Promise<void> {
    const bookings = await this.cinemaService.getBookings();
    this.booking = bookings.find(b => b.code === bookingCode);
    if (this.booking == undefined) {
      this.bookingDetails = false
      this.ticketNotFound = true;
      console.log("Nie ma takiego biletu")
    }
    else{
      this.ticketNotFound = false;
      this.bookingDetails = true;
      const sessions = await this.cinemaService.getSessions();
      this.session = sessions.find(s => s.id === this.booking?.sessionId);
  
      const movies = await this.cinemaService.getMovies();
      this.movie = movies.find(m => m.id === this.session?.movieId);
      console.log(this.movie)
  
      const halls = await this.cinemaService.getHalls();
      this.hall = halls.find(h => h.id === this.session?.hallId);
  
    }
    console.log(this.booking)
  }

  cancelTicket(ticketId: String): void {
    console.log("Bilet skasowany")
  }
}
