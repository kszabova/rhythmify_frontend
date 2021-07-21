import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChantService } from './chant.service';
import { DataSourceListService } from './data-source-list.service';

@Injectable({
  providedIn: 'root'
})
export class DataUploadService {

  constructor(
    private dataSourceListService: DataSourceListService,
    private chantService: ChantService
  ) { }

  uploadDataset(fileToUpload: File, datasetName: string): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('name', datasetName);
    return this.chantService.uploadData(formData)
      .pipe(map(() => { 
        this.dataSourceListService.refreshSources();
        return true;
      }));
  }
}
