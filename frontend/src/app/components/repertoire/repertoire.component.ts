import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';
import { Movie, Session } from '../../models/movie.model';
import {CommonModule} from "@angular/common";
import {CarouselConfig, CarouselModule} from 'ngx-bootstrap/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NavigationExtras, Router, RouterLink, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { MovieService } from '../../services/movie.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-repertoire',
  standalone: true,
  imports: [CommonModule,
    CarouselModule,
    NgbModule, RouterLink, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './repertoire.component.html',
  styleUrl: './repertoire.component.css',
  providers: [
    MovieService,
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
  ]
})

export class RepertoireComponent implements OnInit {
  movies: Movie[] = [];
  sessions: Session[] = [];

  constructor(private cinemaService: CinemaService, private movieService: MovieService, private router: Router) { }

  async ngOnInit(){
    // this.movies = await this.cinemaService.getMovies();
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      console.log(this.movies)
    });
    this.sessions = await this.cinemaService.getSessions();
  }

  getSessionsForMovie(movieId: number): Session[] {
    return this.sessions.filter(session => session.movieId === movieId);
  }
}
