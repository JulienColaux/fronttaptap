import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { ProfilPageModule } from './profil-page/profil-page.module';
import { ClassementModule } from './classement/classement.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ProfilPageModule,
    ClassementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
