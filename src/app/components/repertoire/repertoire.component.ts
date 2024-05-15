import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';
import { Movie, Session } from '../../models/movie.model';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-repertoire',
  standalone: true,
  imports:
    [CommonModule,
    RouterLink,
    FormsModule,
    RouterModule],
  templateUrl: './repertoire.component.html',
  styleUrl: './repertoire.component.css',
})

export class RepertoireComponent implements OnInit {
  movies: Movie[] = [];
  sessions: Session[] = [];

  constructor(private cinemaService: CinemaService) { }

  async ngOnInit(){
    this.movies = await this.cinemaService.getMovies();
    this.sessions = await this.cinemaService.getSessions();
  }

  getSessionsForMovie(movieId: number): Session[] {
    return this.sessions.filter(session => session.movieId === movieId);
  }
}
