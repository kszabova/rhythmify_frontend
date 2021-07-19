import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { IScatterData } from 'src/app/interfaces/scatter-data.interface';
import { IStackedHistogram } from 'src/app/interfaces/stacked-histogram.interface';
import { ChantService } from 'src/app/services/chant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  melodyLengthHistTitle = "Melody Length";
  melodyLengthHistData: number[];

  textLengthHistTitle = "Text Length";
  textLengthHistData: number[];

  melodyStackedHistData: IStackedHistogram[];
  melodyStackedHistTitle = "Melody Length by Genre";
  melodyStackedHistGroupName = "dataset";
  melodyStackedHistXName = "Number of neumes";
  melodyStackedHistYName = "Number of data";
  melodyStackedHistFigureID = "melody-stacked-hist";

  textStackedHistData: IStackedHistogram[];
  textStackedHistTitle = "Text Length by Genre";
  textStackedHistGroupName = "dataset";
  textStackedHistXName = "Number of words";
  textStackedHistYName = "Number of data";
  textStackedHistFigureID = "text-stacked-hist";

  multiScatterData: IScatterData[];
  multiScatterTitle = "Comparison of melody length and text length";
  multiScatterXName = "Melody length (number of neumes)";
  multiScatterYName = "Text length (number of words)";

  private readonly componentDestroyed$ = new Subject();

  constructor(
    private chantService: ChantService
  ) { }

  ngOnInit(): void {
    this.chantService.getList()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        (all_data: any) => {
          console.log("new data");
          console.log(all_data.length);
          if (all_data === null || all_data.length === 0) {
            return;
          }
          let data = all_data.slice(0, 10000);
          this.melodyLengthHistData = data.map(
            chant => chant.volpiano.split("---").length
          );
          this.textLengthHistData = data.map(
            chant => chant.full_text.split(" ").length
          );
          this.melodyStackedHistData = data.map(
            chant => ({
              "value": chant.volpiano.split("---").length,
              "group": chant.dataset_name
          }));
          this.textStackedHistData = data.map(
            chant => ({
              "value": chant.full_text.split(" ").length,
              "group": chant.dataset_name
          }));
          // this.scatterPlotData = data.map(
          //   chant => ({
          //     "x": chant.volpiano.split('-').join('').length,
          //     "y": chant.full_text.split(" ").length
          //   })
          // );
          this.multiScatterData = data
              .map(
                chant => ({
                  "x": chant.volpiano.split('-').join('').length,
                  "y": chant.full_text.split(" ").length,
                  "group": chant.dataset_name,
                  "id": chant.id
                })
          );
        }
      );
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
