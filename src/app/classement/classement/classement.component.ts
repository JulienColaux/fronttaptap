import { Component, OnInit } from '@angular/core';
import { JoueurClassement } from '../../interfaces/joueur-classement';
import { Saison } from '../../interfaces/saison';
import { ClassementService } from '../services/classement.service';
import { CountdownService } from '../services/countdown.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css'] // ✅ Correction de "styleUrl" -> "styleUrls"
})
export class ClassementComponent implements OnInit {
  joueursClassement: JoueurClassement[] = [];
  saison: Saison | null = null;
  countdown$!: Observable<{ days: number, hours: number, minutes: number, seconds: number }>;

  constructor(
    private service: ClassementService,
    private countdownService: CountdownService // ✅ Injection du CountdownService
  ) {}

  ngOnInit(): void {
    const seasonId = 2; // ID de la saison (peut être dynamique)

    // Récupérer le classement des joueurs
    this.service.getClassement(seasonId).subscribe(
      (data: JoueurClassement[]) => {
        this.joueursClassement = data;
        console.log('Joueurs récupérés et classés :', data);
      }
    );

    // Récupérer les informations de la saison
    this.service.getSaisonById(seasonId).subscribe(
      (data: Saison) => {
        this.saison = data;
        console.log('Saison récupérée :', data);

        // ✅ Si la saison a une date limite, démarrer le compte à rebours
        if (this.saison.decompte) {
          this.countdownService.startCountdown(this.saison.decompte);
          this.countdown$ = this.countdownService.getCountdown();
        }
      }
    );
  }
}
