import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(  ) { }

  private storage = window.localStorage;
  private _sourceList = new BehaviorSubject<number[]>([]);

  getStoredSourceList(): number[] {
    let sourcesString = this.storage.getItem('sourceList');
    if (null === sourcesString) {
      return [];
    }

    return JSON.parse(sourcesString);
  }

  getSourceList(): BehaviorSubject<number[]> {
    return this._sourceList;
  }

  setSourceList(list: number[]): void {
    this.storage.setItem('sourceList', JSON.stringify(list));
    this._sourceList.next(list);
  }
}
