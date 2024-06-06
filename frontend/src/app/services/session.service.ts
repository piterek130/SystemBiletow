import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { SessionDto } from '../models/sessionDto.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl = 'http://localhost:8080/api/sessions';

  constructor(private http: HttpClient) { }

  getSessionsByMovieID(movieId: number): Observable<SessionDto[]> {
    return this.http.get<SessionDto[]>(`${this.baseUrl}/${movieId}`);
  }
}