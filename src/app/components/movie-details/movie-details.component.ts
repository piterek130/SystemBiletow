import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CinemaService } from '../../services/cinema.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {Session} from "../../models/movie.model";


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})

export class MovieDetailsComponent implements OnInit {
  movie: any;
  safeTrailerUrl: SafeResourceUrl | undefined;
  sessions: Session[] = [];
  constructor(
    private route: ActivatedRoute,
    private cinemaService: CinemaService,
    private _sanitizer: DomSanitizer,
    private router: Router
  ) {}

  async ngOnInit() {
    this.sessions = await this.cinemaService.getSessions();
    console.log(this.sessions)
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.cinemaService.getMovieById(id).then(movie => {
        this.movie = movie;
        console.log(movie?.trailerUrl)
        this.safeTrailerUrl = this._sanitizer.bypassSecurityTrustResourceUrl(movie.trailerUrl);
      });
    });
  }
  goToSeatReservation(sessionId: number): void {
    this.router.navigate(['/seat-reservation', sessionId], { queryParams: { movieId: this.movie?.id } });
  }
}
