import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChantService } from 'src/app/services/chant.service';

@Component({
  selector: 'app-chant-fetch',
  templateUrl: './chant-fetch.component.html',
  styleUrls: ['./chant-fetch.component.css']
})
export class ChantFetchComponent implements OnInit {

  id: number;

  constructor(
    private chantService: ChantService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
  }

}
