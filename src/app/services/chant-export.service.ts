import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChantService } from './chant.service';

@Injectable({
  providedIn: 'root'
})
export class ChantExportService {

  constructor(
    private chantService: ChantService
  ) { }

  exportChants(ids: number[]): Observable<any> {
    let formData = new FormData();
    console.log(ids);
    formData.append('idsToExport', JSON.stringify(ids));
    return this.chantService.exportChants(formData);
  }
}
