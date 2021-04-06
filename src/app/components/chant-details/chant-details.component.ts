import { Component, OnInit } from '@angular/core';
import { ChantFacadeService } from 'src/app/services/chant-facade.service';

@Component({
  selector: 'app-chant-details',
  templateUrl: './chant-details.component.html',
  styleUrls: ['./chant-details.component.css']
})
export class ChantDetailsComponent implements OnInit {

  chant: any;

  constructor(
    private chantFacadeService: ChantFacadeService) { }

  ngOnInit(): void {
    this.chantFacadeService.chant.subscribe(
      (data:(any)) => this.chant = data
    );
  }
}