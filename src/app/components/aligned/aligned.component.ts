import { Component, OnInit } from '@angular/core';
import { AlignmentService } from 'src/app/services/alignment.service';
import { ChantService } from 'src/app/services/chant.service';

@Component({
  selector: 'app-aligned',
  templateUrl: './aligned.component.html',
  styleUrls: ['./aligned.component.css']
})
export class AlignedComponent implements OnInit {

  obj: any;
  data: number[];

  constructor(
    private chantService: ChantService,
    private alignmentService: AlignmentService
  ) { }

  ngOnInit(): void {
    this.alignmentService.getIds().subscribe(
      (data:any) => this.data = data
    );
    this.chantService.getAligned(this.data).subscribe(
      response => {
        this.obj = response;
        console.log(response);
      }
    );
  }

}
