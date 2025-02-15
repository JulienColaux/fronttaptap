import { Component, OnInit } from '@angular/core';
import { Joueur } from '../interfaces/joueur';
import { Grade } from '../interfaces/grade';
import { ActivatedRoute } from '@angular/router';
import { ProfilPageService } from '../services/profil-page.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  joueur: Joueur | null = null;
  grade: Grade | null = null;
  tropheesUrls: string[] = [];
  joueurId: number | null = null;

  constructor(private pp: ProfilPageService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //  Essayer de récupérer l'ID depuis l'URL
    this.route.paramMap.subscribe(params => {
      const joueurIdFromUrl = params.get('id');
      if (joueurIdFromUrl) {
        this.joueurId = parseInt(joueurIdFromUrl, 10);
      } else {
        //  Sinon, récupérer l'ID depuis le localStorage
        const joueurIdStr = localStorage.getItem('joueurId');
        this.joueurId = joueurIdStr ? parseInt(joueurIdStr, 10) : null;
      }

      //  Vérifier si l'ID est valide avant de charger les données
      if (this.joueurId !== null && !isNaN(this.joueurId)) {
        this.loadJoueurData(this.joueurId);
      } else {
        console.error("ID du joueur invalide !");
      }
    });
  }

  private loadJoueurData(joueurId: number): void {
    this.pp.getJoueurById(joueurId).subscribe(
      (data: Joueur) => {
        this.joueur = data;
        console.log('Joueur récupéré :', data);
  
        if (data.trophees) {
          this.tropheesUrls = data.trophees.map(trophee => `images/${trophee.url_image}`);
        }
  
        // Vérifier l'ID du grade et charger le grade une fois le joueur récupéré
        if (data.iD_EchelleGrade) {
          this.pp.getGradeById(data.iD_EchelleGrade).subscribe(
            (valeur: Grade) => {
              this.grade = valeur;
            },
            error => {
              console.error('Erreur lors de la récupération du grade', error);
            }
          );
        } else {
          console.log("Aucun ID de grade trouvé pour ce joueur");
        }
        
      },
      error => {
        console.error('Erreur lors de la récupération du joueur', error);
      }
    );
  }
}
