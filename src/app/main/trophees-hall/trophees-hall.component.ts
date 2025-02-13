import { TropheesService } from '../../services/trophees.service';
import { TropheeForHall } from './../../interfaces/trophee';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trophees-hall',
  templateUrl: './trophees-hall.component.html',
  styleUrl: './trophees-hall.component.css'
})
export class TropheesHallComponent implements OnInit{

trophees: TropheeForHall[] = [];

constructor(private service: TropheesService){}

ngOnInit(): void {
  this.service.GetAllTrophees().subscribe({
    next: (data) =>{
      this.trophees = data;
    }
  })
}

}
