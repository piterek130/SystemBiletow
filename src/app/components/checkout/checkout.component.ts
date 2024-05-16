import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, Session, Hall } from '../../models/movie.model';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  selectedSeats: number[] = [];
  session: Session | undefined;
  hall: Hall | undefined;
  movie: Movie | undefined;
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

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
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
      this.hall = JSON.parse(params['hall']);
      this.movie = JSON.parse(params['movie']);
      console.log(this.session);
      
      console.log(this.selectedSeats, this.session, this.hall);
    });
  }

  getRow(seat: number): number {
    return Math.floor(seat / 10) + 1;
  }

  getSeatNumber(seat: number): number {
    return seat % 10;
  }

  getTotal(): string {
    return (this.selectedSeats.length * (this.movie?.price || 0)).toFixed(2);

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
    console.log("Confirming and generating ticket...");
    console.log(this.personalDetails);
    this.ticketCode = this.generateTicketCode();
    this.ticketGenerated = true;
  }

  emailMatchValidator(group: FormGroup): any {
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;
    return email === confirmEmail ? null : { emailsMismatch: true };
  }
}
