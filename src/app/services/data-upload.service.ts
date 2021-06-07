import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataUploadService {

  constructor(
    private httpClient: HttpClient
  ) { }

  uploadDataset(fileToUpload: File, datasetName: string): Observable<boolean> {
    const endpoint = 'http://localhost:8000/api/chants/upload/';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('name', datasetName);
    return this.httpClient
      .post(endpoint, formData)
      .pipe(map(() => { return true; }));
  }
}
