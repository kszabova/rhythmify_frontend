import { Component, OnInit } from '@angular/core';
import { IChantPrecomputed } from 'src/app/interfaces/chant-precomputed.interface';
import { ChantFacadeService } from 'src/app/services/chant-facade.service';

@Component({
  selector: 'app-chant-details',
  templateUrl: './chant-details.component.html',
  styleUrls: ['./chant-details.component.css']
})
export class ChantDetailsComponent implements OnInit {

  chant: IChantPrecomputed;

  constructor(
    private chantFacadeService: ChantFacadeService) { }

  ngOnInit(): void {
    this.chantFacadeService.getChantPrecomputed().subscribe(
      (data:(IChantPrecomputed)) => this.chant = data
    );
  }
}