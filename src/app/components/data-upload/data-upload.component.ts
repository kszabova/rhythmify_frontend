import { Component, OnInit } from '@angular/core';
import { DataUploadService } from 'src/app/services/data-upload.service';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css']
})
export class DataUploadComponent implements OnInit {

  fileToUpload: File = null;

  constructor(
    private dataUploadService: DataUploadService
  ) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  upload(): void {
    this.dataUploadService.postFile(this.fileToUpload).subscribe(
      response => console.log(response)
    );

  }

}
