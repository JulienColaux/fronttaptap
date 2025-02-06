import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConexionComponent } from './conexion/conexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    ConexionComponent,
    InscriptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ConexionComponent,
    InscriptionComponent
  ],
  providers : [
    provideHttpClient()
  ]
})
export class LoginModule { }
