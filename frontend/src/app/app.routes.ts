import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepertoireComponent } from './components/movies/repertoire/repertoire.component';
import { BookingComponent } from './components/reservations/booking/booking.component';
import { TicketManagementComponent } from './components/reservations/ticket-management/ticket-management.component';
import { MovieDetailsComponent } from './components/movies/movie-details/movie-details.component';
import { GenreListComponent } from './components/movies/genre-list/genre-list.component';
import {SearchedMoviesComponent} from "./components/movies/searched-movies/searched-movies.component";
import { SeatReservationComponent } from './components/reservations/seat-reservation/seat-reservation.component';
import { MyTicketsComponent } from './components/reservations/my-tickets/my-tickets.component';
import { CheckoutComponent } from './components/reservations/checkout/checkout.component';
import {RegisterComponent} from "./layout/register/register.component";


export const routes: Routes = [
  { path: '', redirectTo: '/repertoire', pathMatch: 'full' },
  { path: 'repertoire', component: RepertoireComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'ticket-management', component: TicketManagementComponent },
  { path: 'genre/:genre', component: GenreListComponent },
  { path: 'search', component: SearchedMoviesComponent },
  { path: 'seat-reservation', component: SeatReservationComponent },
  { path: 'my-tickets', component: MyTicketsComponent },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
