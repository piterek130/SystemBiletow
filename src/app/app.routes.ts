import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { BookingComponent } from './components/booking/booking.component';
import { TicketManagementComponent } from './components/ticket-management/ticket-management.component';


export const routes: Routes = [
  { path: '', redirectTo: '/repertoire', pathMatch: 'full' },  // domyślne przekierowanie na repertuar
  { path: 'repertoire', component: RepertoireComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'ticket-management', component: TicketManagementComponent }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
