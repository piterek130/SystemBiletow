import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
import { Movie } from '../../models/movie.model';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CinemaService} from "../../services/cinema.service";

@Component({
  selector: 'app-searched-movies',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './searched-movies.component.html',
  styleUrl: './searched-movies.component.css'
})
export class SearchedMoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.currentMovies.subscribe(movies => {
      this.movies = movies;
      console.log('Received movies:', this.movies);
    });
  }
}
