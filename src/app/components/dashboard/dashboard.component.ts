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

  melodyStackedHistTitle = "Melody Length by Genre";
  melodyStackedHistData: any;
  melodyStackedHistGroupName: "genre";

  textStackedHistTitle = "Text Length by Genre";
  textStackedHistData: any;
  textStackedHistGroupName: "genre";

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
        this.melodyStackedHistData = data.map(
          chant => ({
            "value": chant.volpiano.split("---").length,
            "group": chant.genre_id
        }));
        this.textStackedHistData = data.map(
          chant => ({
            "value": chant.full_text.split(" ").length,
            "group": chant.genre_id
        }));
      }
    )
  }

}
