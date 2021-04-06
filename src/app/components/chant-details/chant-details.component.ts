import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chant } from 'src/app/models/chant.model';
import { ChantFacadeService } from 'src/app/services/chant-facade.service';
import { ChantService } from 'src/app/services/chant.service';

@Component({
  selector: 'app-chant-details',
  templateUrl: './chant-details.component.html',
  styleUrls: ['./chant-details.component.css']
})
export class ChantDetailsComponent implements OnInit {

  chant: any;

  constructor(
    private chantFacadeService: ChantFacadeService,
    private chantService: ChantService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.chantService.setChant(this.route.snapshot.params.id);
    this.chantFacadeService.chant.subscribe(
      (data:(any)) => this.chant = data
    );
  }
}