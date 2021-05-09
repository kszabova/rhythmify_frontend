import { Component, OnInit } from '@angular/core';
import { IScatterData } from 'src/app/interfaces/scatter-data.interface';
import { IStackedHistogram } from 'src/app/interfaces/stacked-histogram.interface';
import { ChantService } from 'src/app/services/chant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  melodyLengthHistTitle = "Melody Length";
  melodyLengthHistData: number[];

  textLengthHistTitle = "Text Length";
  textLengthHistData: number[];

  melodyStackedHistData: IStackedHistogram[];
  melodyStackedHistTitle = "Melody Length by Genre";
  melodyStackedHistGroupName = "genre";

  textStackedHistData: IStackedHistogram[];
  textStackedHistTitle = "Text Length by Genre";
  textStackedHistGroupName = "genre";

  scatterPlotData: IScatterData[];
  scatterPlotTitle = "Melody Length vs. Text Length";
  scatterPlotXName = "Melody Length";
  scatterPlotYName = "Text Length";

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
        this.scatterPlotData = data.map(
          chant => ({
            "x": chant.volpiano.split('-').join('').length,
            "y": chant.full_text.split(" ").length
          })
        );
      }
    )
  }

}
