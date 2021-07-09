import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {

  private _filterSettings = new BehaviorSubject<object>(null);

  constructor() { }

  getFilterSettings(): BehaviorSubject<object> {
    return this._filterSettings;
  }

  setFilterSettings(object): void {
    this._filterSettings.next(object);
  }
}
