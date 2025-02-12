import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profil-page/profile.component';
import { ConexionComponent } from './login/conexion/conexion.component';
import { ClassementComponent } from './classement/classement/classement.component';
import { NewGameComponent } from './main/new-game/new-game.component';
import { AllGamesComponent } from './main/all-games/all-games.component';
import { RulesComponent } from './main/rules/rules.component';
import { TropheesHallComponent } from './main/trophees-hall/trophees-hall.component';
import { MainComponent } from './main/main/main.component';

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
    path: 'profil/:id', component: ProfileComponent
  },
  {
    path: 'classement', component: ClassementComponent
  },
  {
    path: 'newGame', component: NewGameComponent
  },
  {
    path: 'allGames', component: AllGamesComponent
  },
  {
    path: 'rules', component: RulesComponent
  },
  {
    path: 'tropheesHall', component: TropheesHallComponent
  },
  {
    path: 'menu', component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
