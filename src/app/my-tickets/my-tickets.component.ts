import { Component, OnInit, NgModule } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CinemaService } from '../services/cinema.service';
import { Movie, Booking, Hall, Session } from '../models/movie.model';
import { ActivatedRoute } from '@angular/router';



interface Seat {
  id: number;
  isSelected: boolean;
  isOccupied: boolean;
}
@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.css'
})
export class MyTicketsComponent{
 
}

