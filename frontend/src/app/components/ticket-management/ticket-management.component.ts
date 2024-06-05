import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { BookingDto } from '../../models/bookingDto.model';

@Component({
  selector: 'app-ticket-management',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, HttpClientModule],
  templateUrl: './ticket-management.component.html',
  styleUrl: './ticket-management.component.css',
  providers: [BookingService]
})
export class TicketManagementComponent implements OnInit {
  booking: BookingDto | undefined;
  bookingCode: string = "";
  bookingDetails: any = null;
  ticketNotFound: boolean = false;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {}

  async verifyTicket(bookingCode: string): Promise<void> {
    this.bookingService.getBookingByCode(bookingCode).subscribe(
      (booking: BookingDto) => {
        this.booking = booking;
        this.ticketNotFound = false;
        this.bookingDetails = true;
        console.log(this.booking);
      },
      (error: any) => {
        this.bookingDetails = false;
        this.ticketNotFound = true;
      }
    );
  }

  cancelTicket(ticketId?: number): void {
    if (ticketId !== undefined && this.booking?.status != 'SKASOWANY') {
      this.bookingService.cancelBooking(ticketId).subscribe(
        (updatedBooking: BookingDto) => {
          this.booking = updatedBooking;
          alert('Bilet został pomyślnie skasowany');
        },
        (error: any) => {
          console.log('Error updating status:', error);
          alert('Bilet jest nieważny i nie może być skasowany');
        }
      );
    } else if (this.booking?.status == 'SKASOWANY'){
      alert('Bilet jest juz skasowany!');
    } else {
      console.log('Invalid booking id');
    }
  }
}