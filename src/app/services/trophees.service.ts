import { TropheeForHall } from './../interfaces/trophee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TropheesService {

  private ApiUrl = 'http://localhost:5105/api/Trophee';


  constructor(private http : HttpClient) { }

  GetAllTrophees():Observable<TropheeForHall[]>{
return this.http.get<TropheeForHall[]>(`${this.ApiUrl}/GetAllTrophee`)
  }
}
