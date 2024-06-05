import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import {MovieService} from "../../services/movie.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-genre-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.css',
  providers: [MovieService]
})

export class GenreListComponent implements OnInit {
  movies: Movie[] = [];
  genre: string = ''

  constructor(
      private route: ActivatedRoute,
      private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const genre = params.get('genre');
      if (genre) {
        this.genre = genre;
        this.getMoviesByGenre(genre);
      }
    });
  }

  getMoviesByGenre(genre: string): void {
    this.movieService.getMoviesByGenre(genre).subscribe(
        data => {
          this.movies = data;
        },
        error => {
          console.error('Failed to fetch movies by genre:', error);
          this.movies = [];
        }
    );
  }
}
