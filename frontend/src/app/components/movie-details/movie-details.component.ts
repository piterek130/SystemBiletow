import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from "@angular/common";
import {Session} from "../../models/movie.model";
import {MovieService} from "../../services/movie.service";
import {HttpClientModule} from "@angular/common/http";
import {SafePipe} from "../SafePipe";


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    HttpClientModule,
    SafePipe,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
  providers: [MovieService]
})

export class MovieDetailsComponent implements OnInit {
  movie: any;
  sessions: Session[] = [];
  filteredSessions: Session[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.movieService.getMovie(id).subscribe(movie => {
        console.log(id)
        this.movie = movie;
        console.log(movie?.genres)
        console.log(movie?.trailerUrl)
        this.movieService.getSessions().subscribe(sessions => {
          this.sessions = sessions;
          this.filterSessions();
        });
      });
    });
  }

    filterSessions() {
      this.filteredSessions = this.sessions.filter(session => session.movieId === this.movie.id);
    }

  goToSeatReservation(sessionId: number): void {
    this.router.navigate(['/seat-reservation', sessionId]);
  }
}
