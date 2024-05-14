import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { BookingComponent } from './components/booking/booking.component';
import { TicketManagementComponent } from './components/ticket-management/ticket-management.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component'; // Upewnij się, że zaimportujesz komponent
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { SeatReservationComponent } from './seat-reservation/seat-reservation.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';


export const routes: Routes = [
  { path: '', redirectTo: '/repertoire', pathMatch: 'full' },  // domyślne przekierowanie na repertuar
  { path: 'repertoire', component: RepertoireComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'ticket-management', component: TicketManagementComponent },
  { path: 'genre/:genreName', component: GenreListComponent },
  { path: 'seat-reservation', component: SeatReservationComponent },
  { path: 'my-tickets', component: MyTicketsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
