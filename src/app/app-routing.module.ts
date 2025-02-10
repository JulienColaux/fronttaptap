import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profil-page/profile.component';
import { ConexionComponent } from './login/conexion/conexion.component';
import { ClassementComponent } from './classement/classement/classement.component';

const routes: Routes = [
  {
    path: '', component: ConexionComponent
  },
  {
    path: 'connexion', component: ConexionComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'classement', component: ClassementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
