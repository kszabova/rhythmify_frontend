import { Injectable } from '@angular/core';
import { ChantService } from './chant.service';
import { DataSourceListService } from './data-source-list.service';

@Injectable({
  providedIn: 'root'
})
export class CreateDatasetService {

  constructor(
    private chantService: ChantService,
    private dataSourceListService: DataSourceListService
  ) { }

  createDataset(ids: number[], dataset_name: string): void {
    let formData = new FormData();
    formData.append('idsToExport', JSON.stringify(ids));
    formData.append('name', dataset_name);
    this.chantService.createDataset(formData).subscribe(
      response => {
        let name = response['name'];
        let index = response['index'];
        this.dataSourceListService.refreshSources();
      }
    )
  }
}
