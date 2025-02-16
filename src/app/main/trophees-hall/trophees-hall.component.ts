import { Joueur } from '../../interfaces/joueur';
import { ProfilPageService } from '../../services/profil-page.service';
import { TropheesService } from '../../services/trophees.service';
import { TropheeForHall } from './../../interfaces/trophee';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-trophees-hall',
  templateUrl: './trophees-hall.component.html',
  styleUrls: ['./trophees-hall.component.css'] 
})
export class TropheesHallComponent implements OnInit {

  trophees: TropheeForHall[] = [];

  constructor(private service: TropheesService, private ppservice: ProfilPageService) {}

  ngOnInit(): void {
    this.service.GetAllTrophees().subscribe({
      next: (data) => {
        this.trophees = data;
        // Pour chaque trophée, récupérer le nom du joueur et l'ajouter au trophée
        this.trophees.forEach(trophee => {
          this.ppservice.getJoueurById(trophee.iD_Joueur)
            .pipe(
              map((joueur: Joueur) => joueur.nom),
              catchError(() => of("Nom introuvable"))
            )
            .subscribe((nom) => {
              // On ajoute une nouvelle propriété au trophée
              trophee.nom = nom;
            });
        });
      }
    });
  }


  getName(id: number): Observable<string> {
    return this.ppservice.getJoueurById(id).pipe(
      map((joueur: Joueur) => joueur.nom),
      catchError(() => of("Nom introuvable"))
    );
  }
}
