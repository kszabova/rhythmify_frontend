import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatasetCreatedDialogComponent } from '../components/dialogs/dataset-created-dialog/dataset-created-dialog.component';
import { ChantService } from './chant.service';
import { DataSourceListService } from './data-source-list.service';

@Injectable({
  providedIn: 'root'
})
export class CreateDatasetService {

  constructor(
    private chantService: ChantService,
    private dataSourceListService: DataSourceListService,
    private dialog: MatDialog
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

        const dialogRef = this.dialog.open(DatasetCreatedDialogComponent);
        let instance = dialogRef.componentInstance;
        instance.name = name;
      }
    )
  }
}
