import { Component, OnInit } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CinemaService } from '../../../services/cinema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionDto } from '../../../models/sessionDto.model';

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
  session: SessionDto | undefined;
  seats: any[] = [];
  selectedSeats: number[] =[];


  constructor(
    private cinemaService: CinemaService,
    private route: ActivatedRoute,
    private router: Router

  ) {}

  ngOnInit(){
    this.route.queryParamMap.subscribe(params => {
      const sessionParam = params.get('session');
      if (sessionParam) {
        try {
          this.session = JSON.parse(sessionParam);
        } catch (e) {
          console.error('Invalid session data', e);
          this.router.navigate(['/movies']);
        }
      } else {
        this.router.navigate(['/movies']);
      }
    });
    this.generateSeatMap();
  }

  generateSeatMap() {
    if (!this.session) return;

    const rows = Math.ceil(this.session?.hallCapacity / 10);
    this.seats = Array.from({ length: rows }, (_, rowIndex) => {
      return {
        row: rowIndex + 1,
        seats: Array.from({ length: 10 }, (_, seatIndex) => {
          const seatNumber = rowIndex * 10 + seatIndex + 1;
          const isOccupied = this.session?.bookedSeats.includes(seatNumber);
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
    console.log(this.session)
    this.router.navigate(['/checkout'], {
      queryParams: {
        seats: JSON.stringify(this.selectedSeats),
        session: JSON.stringify(this.session),
      }
    });
  }
}
