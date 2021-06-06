import { Component, OnInit } from '@angular/core';
import { ChantService } from 'src/app/services/chant.service';
import { DataSourceService } from 'src/app/services/data-source.service';

@Component({
  selector: 'app-select-data-source',
  templateUrl: './select-data-source.component.html',
  styleUrls: ['./select-data-source.component.css']
})
export class SelectDataSourceComponent implements OnInit {
  
  dataSources: [number, string][];
  selectedDatasets = new Array<boolean>();
  displaySelection = false;

  constructor(
    private chantService: ChantService,
    private dataSourceService: DataSourceService
  ) { }

  ngOnInit(): void {
    this.getDataSources();
  }

  changeSelection(): void {
    let selected: number[] = [];
    for (let i = 0; i < this.selectedDatasets.length; i++) {
      if (this.selectedDatasets[i]) selected.push(this.dataSources[i][0]);
    }
    this.dataSourceService.sourceList = selected;
  }

  getDataSources(): void {
    this.chantService.getDataSources().subscribe(
      data => {
        this.dataSources = data.sources;
        this.dataSources.forEach(_ => {
          this.selectedDatasets.push(false);
        });
        console.log(this.dataSources);
      });
  }

}
