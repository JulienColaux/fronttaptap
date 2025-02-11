import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfilPageModule { }
