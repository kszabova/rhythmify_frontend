import { Component, OnInit } from '@angular/core';
import { ChantService } from 'src/app/services/chant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chant } from 'src/app/models/chant.model';

@Component({
  selector: 'app-chant-details',
  templateUrl: './chant-details.component.html',
  styleUrls: ['./chant-details.component.css']
})
export class ChantDetailsComponent implements OnInit {

  chant: any;

  constructor(
    private chantService: ChantService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.chantService.get(645).subscribe(
      (data:(any)) => this.chant = data
    );
  }
}