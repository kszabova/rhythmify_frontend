import { Component, OnInit } from '@angular/core';
import { ChantService } from 'src/app/services/chant.service';
import { DataSourceService } from 'src/app/services/data-source.service';
import { DataUploadService } from 'src/app/services/data-upload.service';

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
    private chantService: ChantService
  ) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  upload(): void {
    if (!this.datasetName) {
      this.datasetName = "Unnamed dataset";
    }

    this.dataUploadService
      .uploadDataset(this.fileToUpload, this.datasetName)
      .subscribe(
        response => console.log(response)
      );
  }

  

}
