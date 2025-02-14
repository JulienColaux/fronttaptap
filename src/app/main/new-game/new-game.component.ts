import { Partie } from './../../interfaces/partie';
import { Joueur } from './../../interfaces/joueur';
import { Component, OnInit } from '@angular/core';
import { JoueurForListe, PartieService } from '../../services/partie.service';
import { JoueurService } from '../../services/joueur.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  // Correction : utilisez "styleUrls" au lieu de "styleUrl"
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  amical: boolean = false;
  partieId: number | null = null;
  joueurs: { joueurId: number; points: number }[] = [];
  points: number = 0;
  joueurListe: JoueurForListe[] = [];
  selectedJoueur: JoueurForListe | null = null; // Pour stocker le joueur sélectionné

  seasonId: number | null = null; // Pour avoir la saison où on tape les points

  partieFull: Partie | null = null;

  constructor(private partieService: PartieService, private joueurService: JoueurService) {}

  ngOnInit(): void {
    this.loadJoueurs(); // Charge la liste des joueurs dès l'initialisation du composant

    const seasonIdStr = localStorage.getItem('seasonId');
    this.seasonId = seasonIdStr ? parseInt(seasonIdStr, 10) : null;
  }

  loadJoueurs() {
    this.partieService.getJoueurs().subscribe(joueurs => {
      this.joueurListe = joueurs;
    });
  }

  createPartie() {
    this.partieService.createPartie(this.amical).subscribe(response => {
      this.partieId = response.id;
      console.log("Partie créée avec succès : " + this.partieId);
    });
  }

  addJoueur() {
    if (this.partieId && this.selectedJoueur) {
      this.partieService.addJoueurToPartie(this.partieId, this.selectedJoueur.iD_Joueur, this.points)
        .subscribe(() => {
          this.joueurs.push({ joueurId: this.selectedJoueur!.iD_Joueur, points: this.points });
          console.log("Joueur ajouté avec succès : " + this.selectedJoueur?.nom);
          
          // Récupérer les détails complets de la partie pour vérifier si elle est amicale
          this.partieService.getPartieById(this.partieId!).subscribe(partie => {
            this.partieFull = partie;
            
            if (this.seasonId !== null && this.selectedJoueur) {
              // Appeler addPoint seulement si la partie n'est pas amicale
              if (!this.partieFull.amical) {
                this.joueurService.addPoint(this.seasonId, this.selectedJoueur.iD_Joueur, this.points)
                  .subscribe(() => {
                    console.log(`Points ajoutés pour ${this.selectedJoueur?.nom}`);
                  }, error => {
                    console.error("Erreur lors de l'ajout des points :", error);
                  });
              } else {
                console.log("Partie amicale, aucun point n'a été ajouté.");
              }
              
              // Toujours ajouter l'XP, quelle que soit la nature de la partie
              this.joueurService.addXp(this.selectedJoueur.iD_Joueur, this.points)
                .subscribe(
                  response => {
                    console.log(`XP ajouté avec succès pour ${this.selectedJoueur?.iD_Joueur} avec ${this.points} points`);
                  },
                  error => {
                    console.error("Erreur lors de l'ajout d'XP :", error);
                  }
                );
            } else {
              console.error("Impossible d'ajouter des points : seasonId ou selectedJoueur est null");
            }
          });
        });
    } else {
      console.error("Impossible d'ajouter un joueur : partieId ou selectedJoueur est null");
    }
  }
}
