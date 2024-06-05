import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterModule} from '@angular/router';
import { Movie } from '../../../models/movie.model';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CinemaService} from "../../../services/cinema.service";
import {MovieService} from "../../../services/movie.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-searched-movies',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './searched-movies.component.html',
  styleUrl: './searched-movies.component.css',
  providers: [MovieService]
})
export class SearchedMoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['movies']) {
      this.movies = navigation.extras.state['movies'];
    }
  }

  ngOnInit(): void {
  }
}
