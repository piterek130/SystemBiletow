import { Component, OnInit, NgModule } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { CinemaService } from '../services/cinema.service';
import { Movie, Booking, Hall, Session } from '../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';



interface Seat {
  number: number;
  isSelected: boolean;
  isOccupied: boolean;
}

@Component({
  selector: 'app-seat-reservation',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, FormsModule],
  templateUrl: './seat-reservation.component.html',
  styleUrl: './seat-reservation.component.css'
})
export class SeatReservationComponent implements OnInit {
  session: Session | undefined;
  movie: Movie | undefined;
  hall: Hall | undefined;
  bookings: Booking[] = [];
  seats: any[] = [];
  selectedSeats: number[] =[];

  constructor(
    private cinemaService: CinemaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const sessionId = +params.get('sessionId')!;
      this.loadData(1);
    });
  }

  async loadData(sessionId: number): Promise<void> {
    const sessions = await this.cinemaService.getSessions();
    this.session = sessions.find(s => s.id === sessionId);

    const movies = await this.cinemaService.getMovies();
    this.movie = movies.find(m => m.id === this.session?.movieId);

    const halls = await this.cinemaService.getHalls();
    this.hall = halls.find(h => h.id === this.session?.hallId);

    const bookings = await this.cinemaService.getBookings();
    this.bookings = bookings.filter(b => b.sessionId === sessionId);

    this.generateSeatMap();
  }

  generateSeatMap() {
    console.log(this.hall?.capacity)
    if (!this.hall) return;

    const rows = Math.ceil(this.hall.capacity / 10);
    this.seats = Array.from({ length: rows }, (_, rowIndex) => {
      return {
        row: rowIndex + 1,
        seats: Array.from({ length: 10 }, (_, seatIndex) => {
          const seatNumber = rowIndex * 10 + seatIndex + 1;
          const isOccupied = this.bookings.some(b => b.seatId === seatNumber);
          return { number: seatNumber, isOccupied };
        })
      };
    });
  }

  selectSeat(seat: Seat) {
    if (!seat.isOccupied) {
      seat.isSelected = !seat.isSelected;
      if (seat.isSelected) {
        this.selectedSeats.push(seat.number)
      }
    }
  }

  proceedToCheckout(): void {
    console.log("Proceeding to checkout...");
    console.log(this.selectedSeats)
    // save bookings and ticket
    this.router.navigate(['/checkout'], { 
      queryParams: { 
        seats: JSON.stringify(this.selectedSeats), 
        title: this.movie?.title, 
        session: this.session,
        hall: this.hall
      } 
    });
  }
}
