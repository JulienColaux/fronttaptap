import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joueur } from '../interfaces/joueur';

@Injectable({
  providedIn: 'root'
})

export class ProfilPageService {

private apiUrl = 'http://localhost:5105/api/Joueur';

  constructor(private http: HttpClient) { }

  getJoueurById(id: number): Observable<Joueur>{
    return this.http.get<Joueur>(`${this.apiUrl}/${id}`);
  }
}
