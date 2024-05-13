import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { CinemaService } from '../../services/cinema.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";


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
  constructor(
    private route: ActivatedRoute,
    private cinemaService: CinemaService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.cinemaService.getMovieById(id).then(movie => {
        this.movie = movie;
        console.log(movie?.trailerUrl)
        this.safeTrailerUrl = this._sanitizer.bypassSecurityTrustResourceUrl(movie.trailerUrl);
      });
    });
  }
}
