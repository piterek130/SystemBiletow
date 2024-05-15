import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, Session, Hall } from '../../models/movie.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  selectedSeats: number[] = [];
  session: Session | undefined;
  hall: Hall | undefined;
  title: string | undefined;

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedSeats = JSON.parse(params['seats']);
      this.session = params['session'];
      this.hall = params['hall'];
      this.title = params['title']
      console.log(this.selectedSeats, this.session, this.hall);
    });
  }

  confirmAndGenerateTicket(): void {
    console.log("Confirming and generating ticket...");
    console.log(this.personalDetails);
    // Here you would normally save the booking and ticket information
    this.ticketCode = 'ABCD-1234-EFGH-5678'; // This would be dynamically generated
    this.ticketGenerated = true;
  }
}
