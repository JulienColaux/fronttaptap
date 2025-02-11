import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Saison } from '../../interfaces/saison';
import { JoueurClassement } from '../../interfaces/joueur-classement';


@Injectable({
  providedIn: 'root'
})
export class ClassementService {

  constructor(private http : HttpClient) { }

  private ApiUrl = 'http://localhost:5105/api/Saison';

  getClassement(saisonId: number): Observable<JoueurClassement[]> {
    return this.http.get<JoueurClassement[]>(`${this.ApiUrl}/${saisonId}/classement`);
}


getSaisonById(saisonId: number): Observable<Saison>{
  return this.http.get<Saison>(`${this.ApiUrl}/${saisonId}`);
}
}
