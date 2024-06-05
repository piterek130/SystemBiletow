import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Movie, Session} from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = 'http://localhost:8080/api/movies';
  private baseUrl1 = 'http://localhost:8080/api/sessions';
  private moviesSource1 = new BehaviorSubject<Movie[]>([]);
  currentMovies = this.moviesSource1.asObservable();


  constructor(private http: HttpClient) {
    setTimeout(() => {
      this.testUpdateMovies();
    }, 5000);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}`);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${id}`);
  }

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.baseUrl1}`);
  }

  getMoviesByGenre(genre: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/genre/${genre}`);
  }

  changeMovies(movies: Movie[]): void {
    console.log('MovieService changeMovies:', movies);
    this.moviesSource1.next(movies);
    console.log('current movies', this.currentMovies)
  }

  testUpdateMovies(): void {
    const testMovies: Movie[] = [{
      id: 99,
      title: 'Test Movie',
      description: 'This is a test movie.',
      duration: 120,
      imageUrl: 'https://example.com/test-movie.jpg',
      trailerUrl: 'https://example.com/test-movie-trailer.mp4',
      price: 10,
      releaseDate: '2023-01-01',
      production: 'Test Production',
      director: 'Test Director',
      genres: 'Test'
    }];
    console.log('Updating movies from testUpdateMovies');
    this.changeMovies(testMovies);
  }
}
