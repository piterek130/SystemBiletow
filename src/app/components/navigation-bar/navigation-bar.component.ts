import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CinemaService } from '../../services/cinema.service';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  searchTerm: string = '';

  constructor(private cinemaService: CinemaService, private router: Router) { }

  async searchMovies(): Promise<void> {
    const movies = await this.cinemaService.getMovies();
    const filteredMovies = this.searchTerm ?
      movies.filter((movie: Movie) => movie.title.toLowerCase().startsWith(this.searchTerm.toLowerCase())) :
      movies;

    if (filteredMovies.length === 0) {
      alert('No movies found. Please try a different search term.');
      this.searchTerm = '';
      return
    }

    this.cinemaService.changeMovies(filteredMovies);

    console.log('Filtered movies:', filteredMovies);

    this.router.navigate(['/search']);

    this.searchTerm = '';
  }
}
