import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ClassementService } from './classement.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  
  private countdown$ = new BehaviorSubject<{ days: number, hours: number, minutes: number, seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  private countdownSubscription: Subscription | null = null;
  private apiUrl = 'http://localhost:5105/api/Saison';

  constructor(private classementService: ClassementService, private http: HttpClient) {} 

  addSaison(saisonData: any): Observable<any> {
    const url = `${this.apiUrl}/addSaison`;
    return this.http.post<any>(url, saisonData).pipe(
      catchError(error => {
        console.error("Erreur lors de l'ajout de la saison :", error);
        return throwError(error);
      })
    );
  }

  startCountdown(targetDate: string) {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe(); //  Évite les abonnements multiples
    }

    const target = new Date(targetDate).getTime();

    this.countdownSubscription = interval(1000).pipe(
      map(() => {
        const now = new Date().getTime();
        const timeLeft = target - now;

        if (timeLeft <= 0) {
          this.countdown$.next({ days: 0, hours: 0, minutes: 0, seconds: 0 });

          if (this.countdownSubscription) {
            this.countdownSubscription.unsubscribe(); //  Stoppe le décompte quand fini
          }

          this.createNewSeason(); //  Appelle la création d'une nouvelle saison

          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
        };
      })
    ).subscribe(this.countdown$);
  }

  getCountdown() {
    return this.countdown$.asObservable();
  }

  private createNewSeason() {
    const nouvelleSaison = {
      nom: `Saison ${new Date().getFullYear()}`,
      debut: new Date().toISOString(),
      fin: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString() // Ex : 3 mois après
    };

    this.addSaison(nouvelleSaison).pipe(
      switchMap((response) => {
        if (!response || !response.id) {
          throw new Error("ID de la nouvelle saison manquant !");
        }

        console.log("Nouvelle saison créée avec ID :", response.id);

        // Met à jour le localStorage avec le nouvel ID
        localStorage.setItem('seasonId', response.id.toString());

        // Récupère les infos de la nouvelle saison
        return this.classementService.getSaisonById(response.id);
      }),
      catchError(error => {
        console.error("Erreur lors de la récupération de la nouvelle saison :", error);
        return throwError(error);
      })
    ).subscribe((newSaison) => {
      if (newSaison && newSaison.decompte) {
        console.log("Nouveau décompte récupéré :", newSaison.decompte);
        this.startCountdown(newSaison.decompte); // ✅ Redémarre le countdown avec la nouvelle saison
      } else {
        console.warn("Aucune date de décompte trouvée pour la nouvelle saison.");
      }
    });
  }
}
