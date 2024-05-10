import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';
import { Movie, Session } from '../../models/movie.model';
import {CommonModule} from "@angular/common";
import {CarouselConfig, CarouselModule} from 'ngx-bootstrap/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-repertoire',
  standalone: true,
  imports: [CommonModule,
  CarouselModule,
  NgbModule],
  templateUrl: './repertoire.component.html',
  styleUrl: './repertoire.component.css',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
  ]
})

export class RepertoireComponent implements OnInit {
  movies: Movie[] = [];
  sessions: Session[] = [];

  noWrapSlides = false;
  showIndicator = true;

  constructor(private cinemaService: CinemaService) { }

  async ngOnInit(){
    this.movies = await this.cinemaService.getMovies();
    this.sessions = await this.cinemaService.getSessions();
  }

  getSessionsForMovie(movieId: number): Session[] {
    return this.sessions.filter(session => session.movieId === movieId);
  }
}
