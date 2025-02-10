import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassementComponent } from './classement/classement.component';



@NgModule({
  declarations: [
    ClassementComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ClassementComponent
  ]
})
export class ClassementModule { }
