import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  private apiUrl = 'http://localhost:5105/api/Joueur';


  constructor(private http: HttpClient) { }

  addPoint(seasonId: number, joueurId: number, points: number): Observable<any> {
    const body = { joueurId, seasonId, points };  // JSON body
    return this.http.post(`${this.apiUrl}/addPoints`, body, { responseType: 'text' });
  }

  addXp(joueurId: number, xp: number): Observable<any> {
    const body = { joueurId, xp };  // JSON body
    return this.http.post(`${this.apiUrl}/addXp`, body, { responseType: 'text' });
  }
  




}
