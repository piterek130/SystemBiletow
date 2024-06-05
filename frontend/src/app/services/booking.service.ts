import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BookingDto } from '../models/bookingDto.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) { }

  getBookingByCode(code: string): Observable<BookingDto> {
    return this.http.get<BookingDto>(`${this.baseUrl}/code/${code}`);
  }

  cancelBooking(id: number): Observable<BookingDto> {
    return this.http.put<BookingDto>(`${this.baseUrl}/${id}/cancel`, null).pipe(
        catchError(this.handleError));  
}

    private handleError(error: HttpErrorResponse) {
        if (error.status === 404) {
          return throwError('Booking not found');
        } else if (error.status === 406) { 
          return throwError('Booking is not valid');
        } else {
          return throwError('An unexpected error occurred');
        }
      }
}
