import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RulesComponent } from './rules/rules.component';
import { TropheesHallComponent } from './trophees-hall/trophees-hall.component';
import { NewGameComponent } from './new-game/new-game.component';
import { AllGamesComponent } from './all-games/all-games.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent,
    RulesComponent,
    TropheesHallComponent,
    NewGameComponent,
    AllGamesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    MainComponent,
    RulesComponent,
    TropheesHallComponent,
    NewGameComponent,
    AllGamesComponent
  ]
})
export class MainModule { }
