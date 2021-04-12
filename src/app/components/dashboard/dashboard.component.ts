import { Component, OnInit } from '@angular/core';
import { ChantService } from 'src/app/services/chant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  melodyLengthHistTitle = "Melody Length";
  melodyLengthHistData: any;

  textLengthHistTitle = "Text Length";
  textLengthHistData: any;

  constructor(
    private chantService: ChantService
  ) { }

  ngOnInit(): void {
    this.chantService.getAll().subscribe(
      (data: any) => {
        this.melodyLengthHistData = data.map(
          chant => chant.volpiano.split("---").length
        );
        this.textLengthHistData = data.map(
          chant => chant.full_text.split(" ").length
        );
      }
    )
  }

}
