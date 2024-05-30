import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { CinemaService } from '../../services/cinema.service';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.css'
})
export class GenreListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
      private route: ActivatedRoute,
      private cinemaService: CinemaService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      const genreName = params.get('genreName');
      if (genreName) {
        this.movies = await this.cinemaService.getMoviesByGenre(genreName);
      }
    });
  }
}
