import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';
import { Session } from '../../models/movie.model';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})

export class BookingComponent implements OnInit {
  sessions: Session[] = [];

  constructor(private cinemaService: CinemaService) { }

  async ngOnInit() {
    this.sessions = await this.cinemaService.getSessions();
  }
}
