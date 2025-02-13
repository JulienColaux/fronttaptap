import { Component, OnInit } from '@angular/core';
import { Joueur } from '../interfaces/joueur';
import { Grade } from '../interfaces/grade';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProfilPageService } from '../services/profil-page.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  joueur: Joueur | null = null;
  grade: Grade | null = null;
  tropheesUrls: string[] = [];
  joueurId: string | null = null;


  constructor(private pp : ProfilPageService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL et le convertir en nombre
    const joueurIdStr = this.route.snapshot.paramMap.get('id');
    const joueurId = joueurIdStr ? parseInt(joueurIdStr, 10) : null;
  
    if (joueurId !== null && !isNaN(joueurId)) {
      this.pp.getJoueurById(joueurId).subscribe(
        (data: Joueur) => {
          this.joueur = data;
          console.log('Joueur récupéré :', data);
  
          if (data.trophees) {
            this.tropheesUrls = data.trophees.map(trophee => `/images/${trophee.url_image}`);
          }
          console.log('Trophées récupérés :', this.tropheesUrls);
        },
        error => {
          console.error('Erreur lors de la récupération du joueur', error);
        }
      );
  
      this.pp.getGradeById(joueurId).subscribe(
        (valeur: Grade) => {
          this.grade = valeur;
        },
        error => {
          console.error('Erreur lors de la récupération du grade', error);
        }
      );
    } else {
      console.error("ID du joueur invalide !");
    }
  }
  
}
