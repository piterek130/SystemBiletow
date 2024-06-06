import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from "@angular/common";
import {MovieService} from "../../../services/movie.service";
import {HttpClientModule} from "@angular/common/http";
import {SafePipe} from "../SafePipe";
import { SessionService } from '../../../services/session.service';
import { SessionDto } from '../../../models/sessionDto.model';


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
  providers: [MovieService, SessionService]
})

export class MovieDetailsComponent implements OnInit {
  movie: any;
  sessions: SessionDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private sessionService: SessionService
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.movieService.getMovie(id).subscribe(movie => {
        console.log(id)
        this.movie = movie;
        console.log(movie?.genres)
        console.log(movie?.trailerUrl)
        this.sessionService.getSessionsByMovieID(this.movie.id).subscribe(sessions => {
          this.sessions = sessions;
          console.log(sessions);
        });
      });
    });
  }

  goToSeatReservation(session: SessionDto): void {
    this.router.navigate(['/seat-reservation'], { queryParams: { session: JSON.stringify(session) } });
  }
}
