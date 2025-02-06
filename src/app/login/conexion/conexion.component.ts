import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-conexion',
  templateUrl: './conexion.component.html',
  styleUrl: './conexion.component.css'
})
export class ConexionComponent {
  email: string = '';
  password: string = '';

  constructor(private logService: LoginService, private router: Router){}

    login(){
      this.logService.login({email: this.email, password: this.password} ).subscribe(response =>{
        alert('Connexion réussi');
        localStorage.setItem('token', response.token);
        this.router.navigate(['/profile']);
      },error => {
        alert ('Erreur de connexion');
      });
    }
}
