import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SessionDto } from '../../../models/sessionDto.model';
import { BookingService } from '../../../services/booking.service';
import { HttpClientModule } from '@angular/common/http';
import { Booking } from '../../../models/movie.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, HttpClientModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers: [BookingService]
})
export class CheckoutComponent implements OnInit {
  selectedSeats: number[] = [];
  session: SessionDto | undefined;
  showPersonalDetailsForm: boolean = false;
  personalDetailsForm: FormGroup;

  personalDetails: any = {
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phone: '',
    nip: '',
    createAccount: false
  };
  ticketGenerated: boolean = false;
  ticketCode: string = '';

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private bookingService: BookingService) {
    this.personalDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      phone: [''],
      nip: ['']
    }, { validator: this.emailMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedSeats = JSON.parse(params['seats']);
      this.session = JSON.parse(params['session']);
    });
  }

  getRow(seat: number): number {
    return Math.floor(seat / 10) + 1;
  }

  getSeatNumber(seat: number): number {
    return seat % 10;
  }

  getTotal(): string {
    return (this.selectedSeats.length * (this.session?.ticketPrice || 0)).toFixed(2);

  }

  generateTicketCode(length: number = 6): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  confirmAndGenerateTicket(): void {
    Object.keys(this.personalDetailsForm.controls).forEach(field => {
      const control = this.personalDetailsForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });

    if (this.personalDetailsForm.invalid) {
      return;
    }
    this.ticketCode = this.generateTicketCode();
    this.ticketGenerated = true;
    const booking: Booking = {
      sessionId: this.session?.id ?? 0,
      seatId: this.selectedSeats,
      customerEmail: this.personalDetailsForm.get('email')?.value,
      code: this.ticketCode,
    };
    console.log(booking)

    this.bookingService.addBooking(booking).subscribe(
      (response) => {
        alert('Bilet został zarezerwowany')
      },
      (error) => {
        alert('Podczas rezerwacji wystąpił błąd')
      }
    );

  }

  emailMatchValidator(group: FormGroup): any {
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;
    return email === confirmEmail ? null : { emailsMismatch: true };
  }
}
