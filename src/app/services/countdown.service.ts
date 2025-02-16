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



  createNewSeason(): Observable<any> {
    const url = `${this.apiUrl}/addSaison`;
    return this.http.post<any>(url, {}).pipe(
      catchError(error => {
        console.error("Erreur lors de l'ajout de la saison :", error);
        return throwError(() => error);
      })
    );
  }
  



  startCountdown(targetDate: string) {
    //evite que le decompte etourne en boucle (abonement multiple)
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    const target = new Date(targetDate).getTime();

    this.countdownSubscription = interval(1000).pipe( //creer un observa qui sera  qui emet un event chaque sec (la fonction dans map)
      map(() => {
        const now = new Date().getTime();
        const timeLeft = target - now;

        if (timeLeft <= 0) {
          this.countdown$.next({ days: 0, hours: 0, minutes: 0, seconds: 0 });

          if (this.countdownSubscription) {
            this.countdownSubscription.unsubscribe(); //  Stop l appel de la fonction chaque sec
          }

          this.createNewSeason().subscribe(
            response =>{
              const newSaisonId = response.saisonId;
              localStorage.setItem('seasonId', newSaisonId);
            }
          )

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




}
