import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { BookingComponent } from './components/booking/booking.component';
import { TicketManagementComponent } from './components/ticket-management/ticket-management.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component'; // Upewnij się, że zaimportujesz komponent
import { GenreListComponent } from './components/genre-list/genre-list.component';
import {SearchedMoviesComponent} from "./components/searched-movies/searched-movies.component";

export const routes: Routes = [
  { path: '', redirectTo: '/repertoire', pathMatch: 'full' },  // domyślne przekierowanie na repertuar
  { path: 'repertoire', component: RepertoireComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'ticket-management', component: TicketManagementComponent },
  { path: 'genre/:genreName', component: GenreListComponent },
  { path: 'search', component: SearchedMoviesComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
