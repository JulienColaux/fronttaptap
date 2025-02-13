import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  
  private countdown$ = new BehaviorSubject<{ days: number, hours: number, minutes: number, seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  startCountdown(targetDate: string) {
    const target = new Date(targetDate).getTime(); // Convertit la date en timestamp

    interval(1000).pipe(
      map(() => {
        const now = new Date().getTime();
        const timeLeft = target - now;

        if (timeLeft <= 0) {
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
