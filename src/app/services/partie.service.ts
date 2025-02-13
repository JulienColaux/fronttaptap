import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



export interface JoueurForListe {
  iD_Joueur: number;
  nom: string;
}



@Injectable({
  providedIn: 'root'
})
export class PartieService {

  private apiUrl = 'http://localhost:5105/api/Partie';
  private joueurUrl = 'http://localhost:5105/api/Joueur/gettAllNames';



  constructor(private http: HttpClient) { }

   // Créer une partie
   createPartie(amical: boolean): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}`, { amical });
  }

  // Ajouter un joueur à une partie
  addJoueurToPartie(partieId: number, joueurId: number, points: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${partieId}/joueur`, { joueurId, points });
  }



  getJoueurs(): Observable<JoueurForListe[]> {
    return this.http.get<JoueurForListe[]>(this.joueurUrl);
  }
  
}

