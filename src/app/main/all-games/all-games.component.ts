import { Component, OnInit} from '@angular/core';
import { PartieService } from '../../services/partie.service';
import { PartieForAllGames } from '../../interfaces/allgames';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrl: './all-games.component.css'
})
export class AllGamesComponent implements OnInit{

  parties: PartieForAllGames[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private partieService: PartieService) {}


  ngOnInit() {
    this.partieService.getParties().subscribe({
      next: (data) => {
        this.parties = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = "Erreur de chargement des parties.";
        console.error("Erreur API :", error);
        this.isLoading = false;
      }
    });

}
}
