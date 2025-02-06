import { Component, OnInit } from '@angular/core';
import { Joueur } from '../interfaces/joueur';
import { ProfilPageService } from './profil-page.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  joueur: Joueur | null = null;

  constructor(private pp : ProfilPageService ) { }

  ngOnInit(): void {
    const id = 1;
    this.pp.getJoueurById(id).subscribe(
      (data: Joueur) => {
        this.joueur = data;
        console.log('Joueur récupéré :', data);
      },
      error =>{
        console.error('Erreur lors de la récup du joueur');
      }
    );
  }
}
