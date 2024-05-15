import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';
import { Ticket } from '../../models/movie.model';

import { NgFor } from '@angular/common';
@Component({
  selector: 'app-ticket-management',
  standalone: true,
  imports: [NgFor],
  templateUrl: './ticket-management.component.html',
  styleUrl: './ticket-management.component.css'
})
export class TicketManagementComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private cinemaService: CinemaService) { }

  ngOnInit(): void {
    // this.tickets = this.cinemaService.getTickets();
  }

  verifyTicket(ticketId: number): void {
    // Metoda do weryfikacji biletu
  }

  cancelTicket(ticketId: number): void {
    // Metoda do anulowania biletu
  }
}
