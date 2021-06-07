import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChantService } from './chant.service';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(  ) { }

  private _sourceList: number[] = [];

  get sourceList(): number[] {
    return this._sourceList;
  }

  set sourceList(list: number[]) {
    this._sourceList = list;
  }
}
