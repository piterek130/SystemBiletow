import { Component, OnInit } from '@angular/core';
import { Movie, Session } from '../../../models/movie.model';
import {CommonModule} from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterLink, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { MovieService } from '../../../services/movie.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-repertoire',
  standalone: true,
  imports: [
      CommonModule,
      NgbModule,
      RouterLink,
      FormsModule,
      RouterModule,
      HttpClientModule],
  templateUrl: './repertoire.component.html',
  styleUrl: './repertoire.component.css',
  providers: [
    MovieService]
})

export class RepertoireComponent implements OnInit {
  movies: Movie[] = [];
  sessions: Session[] = [];

  constructor(private movieService: MovieService) { }

  async ngOnInit(){
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      console.log(this.movies)
    });
    this.movieService.getSessions();
  }
}
