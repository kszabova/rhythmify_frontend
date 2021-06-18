import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChantService } from './chant.service';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(  ) { }

  private storage = window.sessionStorage;
  private _sourceList = new Subject<number[]>();

  getStoredSourceList(): number[] {
    let sourcesString = this.storage.getItem('sourceList');
    if (null === sourcesString) {
      return [];
    }

    return JSON.parse(sourcesString);
  }

  getSourceList(): Subject<number[]> {
    return this._sourceList;
  }

  setSourceList(list: number[]): void {
    this.storage.setItem('sourceList', JSON.stringify(list));
    this._sourceList.next(list);
  }
}
