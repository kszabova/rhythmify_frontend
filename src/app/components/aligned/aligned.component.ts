import { Component, OnInit } from '@angular/core';
import { ChantService } from 'src/app/services/chant.service';

@Component({
  selector: 'app-aligned',
  templateUrl: './aligned.component.html',
  styleUrls: ['./aligned.component.css']
})
export class AlignedComponent implements OnInit {

  obj: any;

  constructor(
    private chantService: ChantService
  ) { }

  ngOnInit(): void {
    const data = [621, 645];
    this.chantService.getAligned(data).subscribe(
      response => {
        this.obj = response;
        console.log(response);
      }
    );
  }

}
