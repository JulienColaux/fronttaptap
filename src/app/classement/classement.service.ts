import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JoueurClassement } from '../interfaces/joueur-classement';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClassementService {

  constructor(private http : HttpClient) { }

  private ApiUrl = 'http://localhost:5105/api/Saison';

  getClassement(saisonId: number): Observable<JoueurClassement[]> {
    return this.http.get<JoueurClassement[]>(`${this.ApiUrl}/${saisonId}/classement`);
}

}
