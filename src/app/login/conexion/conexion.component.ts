import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-conexion',
  templateUrl: './conexion.component.html',
  styleUrls: ['./conexion.component.css']
})
export class ConexionComponent {
  email: string = '';
  password: string = '';
  userId?: number; // Déclarer comme optionnel pour éviter les erreurs
  joueurId?: number;

  constructor(private logService: LoginService, private router: Router) {}

  login() {
    this.logService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        // Stocke le token dans le localStorage
        localStorage.setItem('token', response.token);

        // Récupération de l'ID utilisateur
        this.logService.getUserId(this.email).subscribe({
          next: (userId) => {
            if (userId === null || userId === undefined || isNaN(userId)) {
              console.error('ID utilisateur non trouvé ou invalide.');
              alert('Erreur : ID utilisateur non trouvé.');
              return;
            }

            this.userId = userId; // Stocke l'ID utilisateur
            console.log('UserID récupéré :', this.userId);

            // Récupération de l'ID du joueur
            this.logService.getJoueurId(this.userId).subscribe({
              next: (joueurId) => {
                if (joueurId === null || joueurId === undefined || isNaN(joueurId)) {
                  console.error('ID Joueur non trouvé ou invalide.');
                  alert('Erreur : ID Joueur non trouvé.');
                  return;
                }

                this.joueurId = joueurId; // Stocke l'ID joueur
                localStorage.setItem('joueurId', joueurId.toString());
                localStorage.setItem('seasonId', "1");
                console.log('JoueurID récupéré :', this.joueurId);
                console.log('SaisonID récupéré : 1');

                // Redirection vers le profil
                this.router.navigate([`/profil/${this.joueurId}`]);
              },
              error: (err) => {
                console.error('Erreur lors de la récupération de l\'ID joueur:', err);
                alert('Erreur lors de la récupération de l\'ID joueur.');
              }
            });
          },
          error: (err) => {
            console.error('Erreur lors de la récupération de l\'ID utilisateur:', err);
            alert('Erreur lors de la récupération de l\'ID utilisateur.');
          }
        });
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
        alert('Erreur de connexion. Vérifiez vos identifiants.');
      }
    });
  }
}
