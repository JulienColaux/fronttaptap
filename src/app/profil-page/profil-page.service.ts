import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joueur } from '../interfaces/joueur';
import { Grade } from '../interfaces/grade';

@Injectable({
  providedIn: 'root'
})

export class ProfilPageService {

private joueurApiUrl = 'http://localhost:5105/api/Joueur';
private gradeApiUrl = 'http://localhost:5105/api/Grade';

  constructor(private http: HttpClient) { }

  getJoueurById(id: number): Observable<Joueur>{
    return this.http.get<Joueur>(`${this.joueurApiUrl}/${id}`);
  }

  getGradeById(id: number): Observable<Grade>{
    return this.http.get<Grade>(`${this.gradeApiUrl}/${id}`)
  }
}
