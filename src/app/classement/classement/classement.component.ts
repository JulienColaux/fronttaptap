import { Component, OnInit } from '@angular/core';
import { JoueurClassement } from '../../interfaces/joueur-classement';
import { Saison } from '../../interfaces/saison';
import { Observable } from 'rxjs';
import { ClassementService } from '../../services/classement.service';
import { CountdownService } from '../../services/countdown.service';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css'] // ✅ Correction de "styleUrl" -> "styleUrls"
})
export class ClassementComponent implements OnInit {
  joueursClassement: JoueurClassement[] = [];
  saison: Saison | null = null;
  countdown$!: Observable<{ days: number, hours: number, minutes: number, seconds: number }>;

  seasonId: number | null = null;

  constructor(
    private service: ClassementService,
    private countdownService: CountdownService // ✅ Injection du CountdownService
  ) {}

  ngOnInit(): void {
    const seasonIdstr = localStorage.getItem('seasonId');
    this.seasonId = seasonIdstr ? parseInt(seasonIdstr, 10) : null;
  
    if (this.seasonId !== null) {
      // ✅ Ensure seasonId is valid before making API calls
      this.service.getClassement(this.seasonId).subscribe(
        (data: JoueurClassement[]) => {
          this.joueursClassement = data;
          console.log('Joueurs récupérés et classés :', data);
        },
        (error) => {
          console.error('Erreur lors de la récupération du classement:', error);
        }
      );
  
      this.service.getSaisonById(this.seasonId).subscribe(
        (data: Saison) => {
          this.saison = data;
          console.log('Saison récupérée :', data);
  
          // ✅ Vérifier si la saison a un décompte avant de démarrer le compte à rebours
          if (this.saison.decompte) {
            this.countdownService.startCountdown(this.saison.decompte);
            this.countdown$ = this.countdownService.getCountdown();
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de la saison:', error);
        }
      );
    } else {
      console.error("Impossible de récupérer les informations: seasonId est null.");
    }
  }
}
