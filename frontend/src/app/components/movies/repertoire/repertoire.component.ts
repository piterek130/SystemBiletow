import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Movie} from '../../../models/movie.model';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MovieService } from '../../../services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import * as bootstrap from 'bootstrap';

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
  styleUrls: ['./repertoire.component.css',
    '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'],
  providers: [
    MovieService]
})

export class RepertoireComponent implements OnInit, AfterViewInit {
  @ViewChild('movieCarousel', { static: true }) movieCarousel!: ElementRef;
  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  async ngOnInit() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      console.log(this.movies)
    });
  }

  ngAfterViewInit() {
    if (this.movieCarousel) {
      new bootstrap.Carousel(this.movieCarousel.nativeElement, {
        interval: 5000,
        wrap: true,
        keyboard: true,
        pause: 'hover'
      });
    } else {
      console.error("movieCarousel is not defined");
    }
  }
}
