import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassementComponent } from './classement/classement.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ClassementComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule
  ],
  exports: [
    ClassementComponent
  ]
})
export class ClassementModule { }
