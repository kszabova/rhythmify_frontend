import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataUploadService } from 'src/app/services/data-upload.service';
import { MissingDatasetNameDialogComponent } from '../dialogs/missing-dataset-name-dialog/missing-dataset-name-dialog.component';
import { UploadSuccessfulDialogComponent } from '../dialogs/upload-successful-dialog/upload-successful-dialog.component';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css']
})
export class DataUploadComponent implements OnInit {

  fileToUpload: File = null;
  datasetName: string = null;

  constructor(
    private dataUploadService: DataUploadService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  upload(): void {
    if (!this.datasetName) {
      const dialogRef = this.dialog.open(MissingDatasetNameDialogComponent);
      return;
    }

    this.dataUploadService
      .uploadDataset(this.fileToUpload, this.datasetName)
      .subscribe(
        _ => {
          this.dialog.open(UploadSuccessfulDialogComponent);
        }
      );
  }

  

}
