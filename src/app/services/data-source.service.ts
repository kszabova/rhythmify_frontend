import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChantService } from './chant.service';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(  ) { }

  private storage = window.sessionStorage;

  get sourceList(): number[] {
    let sourcesString = this.storage.getItem('sourceList');
    if (null === sourcesString) {
      return [];
    }

    return JSON.parse(sourcesString);
  }

  set sourceList(list: number[]) {
    this.storage.setItem('sourceList', JSON.stringify(list));
  }
}
