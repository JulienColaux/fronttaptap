import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:5105/api/User';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, user);
  }


  getJoueurId(userId: number): Observable<number> {
    return this.http.get<{ joueurId: number }>(`${this.apiUrl}/getJoueurId/${userId}`)
      .pipe(
        map(response => response.joueurId) // ✅ Extraction de `joueurId`
      );
  }
  
  
  getUserId(mail: string): Observable<number> {
    return this.http.get<{ userId: number }>(`${this.apiUrl}/getUserId`, { params: { email: mail } })
      .pipe(
        map(response => response.userId) // ✅ Extraire `userId` de l'objet JSON
      );
  }
  

  
}
