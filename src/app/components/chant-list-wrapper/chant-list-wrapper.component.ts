import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChantService } from 'src/app/services/chant.service';

@Component({
  selector: 'app-chant-list-wrapper',
  templateUrl: './chant-list-wrapper.component.html',
  styleUrls: ['./chant-list-wrapper.component.css']
})
export class ChantListWrapperComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private chantService: ChantService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let incipit = params['incipit'];
      if (incipit) {
        this.chantService.setList(incipit);
      }
      else {
        this.chantService.setList();
      }
    })
  }

}
