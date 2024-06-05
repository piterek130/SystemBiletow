import {Component, HostListener} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MovieService} from "../../services/movie.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2';




@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
      FormsModule,
      CommonModule,
      RouterLink,
      HttpClientModule],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  providers: [MovieService, AuthService]
})
export class NavigationBarComponent {
  searchTerm: string = '';
  isDropdownVisible = false;
  username: string = '';
  password: string = '';
  loggedIn: boolean = false;
  currentUsername: string | null = null;

  constructor(private movieService: MovieService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    });
    this.authService.getUsername().subscribe(username => {
      this.currentUsername = username;
    });
  }

  searchMovies(): void {
    // const movies = await this.cinemaService.getMovies();
    // const filteredMovies = this.searchTerm ?
    //   movies.filter((movie: Movie) => movie.title.toLowerCase().startsWith(this.searchTerm.toLowerCase())) :
    //   movies;
    this.movieService.getMovies().subscribe( movies => {
      const filteredMovies = this.searchTerm ?
          movies.filter((movie: Movie) => movie.title.toLowerCase().startsWith(this.searchTerm.toLowerCase())) :
          movies;


      if (filteredMovies.length === 0) {
        alert('No movies found. Please try a different search term.');
        this.searchTerm = '';
        return;
      }

      console.log('Filtered movies:', filteredMovies);
      this.movieService.changeMovies(filteredMovies);
      console.log('Movies updated in BehaviorSubject');

      setTimeout(() => {
        this.router.navigate(['/search']).then(() => {
          console.log('Navigated to /search');
          this.searchTerm = '';
        });
      }, 1000);
    });
  }

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const dropdownContent = document.getElementById('dropdownContent');
    if (dropdownContent && !dropdownContent.contains(event.target as Node)) {
      this.isDropdownVisible = false;
    }
  }

  preventClose(event: MouseEvent): void {
    event.stopPropagation();
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
        response => {
          console.log(response.message);
          Swal.fire({
            icon: 'success',
            title: 'Login successful',
            showConfirmButton: false,
            timer: 1000
          });
        },
        error => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Invalid credentials',
            showConfirmButton: false,
            timer: 1000
          });
        }
    );
    this.username = '';
    this.password = '';
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    Swal.fire({
      icon: 'success',
      title: 'Successful logout',
      showConfirmButton: false,
      timer: 1000
    });
  }
}
