import { Component, OnInit } from '@angular/core';
import { JoueurForListe, PartieService } from '../../services/partie.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent implements OnInit {
  amical: boolean = false;
  partieId: number | null = null;
  joueurs: { joueurId: number; points: number }[] = [];
  joueurId: number = 0; // On utilisera un menu déroulant donc plus besoin de cet input manuel
  points: number = 0;
  joueurListe: JoueurForListe[] = [];
  selectedJoueur: JoueurForListe | null = null; // Pour stocker le joueur sélectionné

  constructor(private partieService: PartieService) {}

  ngOnInit(): void {
    this.loadJoueurs(); // Charge la liste des joueurs dès que le composant est initialisé
  }

  loadJoueurs() {
    this.partieService.getJoueurs().subscribe(joueurs => {
      this.joueurListe = joueurs;
    });
  }

  createPartie() {
    this.partieService.createPartie(this.amical).subscribe(response => {
      this.partieId = response.id;
    });
  }

  addJoueur() {
    if (this.partieId && this.selectedJoueur) {
      this.partieService.addJoueurToPartie(this.partieId, this.selectedJoueur.iD_Joueur, this.points).subscribe(() => {
        this.joueurs.push({ joueurId: this.selectedJoueur!.iD_Joueur, points: this.points });
      });
    }
  }
}
