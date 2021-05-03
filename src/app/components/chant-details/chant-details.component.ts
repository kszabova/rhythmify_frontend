import { Component, OnInit } from '@angular/core';
import { IChant } from 'src/app/interfaces/chant.interface';
import { ChantFacadeService } from 'src/app/services/chant-facade.service';

@Component({
  selector: 'app-chant-details',
  templateUrl: './chant-details.component.html',
  styleUrls: ['./chant-details.component.css']
})
export class ChantDetailsComponent implements OnInit {

  chant: IChant;

  constructor(
    private chantFacadeService: ChantFacadeService) { }

  ngOnInit(): void {
    this.chantFacadeService.getChant().subscribe(
      (data:(IChant)) => this.chant = data
    );
  }
}