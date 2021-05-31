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

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'http://localhost:8000/api/melodies/upload/';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData)
      .pipe(map(() => { return true; }));
  }
}
