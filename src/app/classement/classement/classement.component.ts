import { Component, OnInit } from '@angular/core';
import { JoueurClassement } from '../../interfaces/joueur-classement';
import { ClassementService } from '../classement.service';
import { CommonModule } from '@angular/common'; // ✅ Ajout de CommonModule

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrl: './classement.component.css'
})
export class ClassementComponent implements OnInit{

joueursClassement : JoueurClassement[] = [];

  constructor(private service : ClassementService ) { }


ngOnInit(): void {
  const seasonId = 2;

  this.service.getClassement(seasonId).subscribe(
    (data: JoueurClassement[]) =>{
      this.joueursClassement = data
      console.log('Joueur récupéré et classé :', data);

    }
  )
}

}
