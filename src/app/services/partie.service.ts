import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PartieForAllGames } from '../interfaces/allgames';
import { Partie } from '../interfaces/partie';



export interface JoueurForListe {
  iD_Joueur: number;
  nom: string;
  avatar_URL?: string;

}



@Injectable({
  providedIn: 'root'
})
export class PartieService {

  private apiUrl = 'http://localhost:5105/api/Partie';
  private joueurUrl = 'http://localhost:5105/api/Joueur/gettAllNames';
  private apiUrlallParties = 'http://localhost:5105/api/Partie/allParties'; // URL de l'API



  constructor(private http: HttpClient) { }

  // Créer une partie
  createPartie(amical: boolean): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}`, { amical });
  }

  // Ajouter un joueur à une partie
  addJoueurToPartie(partieId: number, joueurId: number, points: number): Observable<any> {
    const params = new HttpParams()
        .set('JoueurId', joueurId.toString())
        .set('Points', points.toString());

    return this.http.post(`${this.apiUrl}/${partieId}/joueur`, {}, { params });
}




  getJoueurs(): Observable<JoueurForListe[]> {
    return this.http.get<JoueurForListe[]>(this.joueurUrl);
  }

  getPartieById(id: number): Observable<Partie> {
    return this.http.get<Partie>(`${this.apiUrl}/${id}`);
  }

  getParties(): Observable<PartieForAllGames[]> {
    return this.http.get<PartieForAllGames[]>(this.apiUrlallParties);
  }

}

