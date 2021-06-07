import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChantService } from './chant.service';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataSourceListService {

  constructor(
    private chantService: ChantService
  ) { }
  
  private _allSources: Subject<[number, string][]> = new Subject<[number, string][]>();

  getAllSources(): Subject<[number, string][]> {
    return this._allSources;
  }

  refreshSources(): void {
    this.chantService.getDataSources().subscribe(
      data => this._allSources.next(data.sources)
    );
  }
}
