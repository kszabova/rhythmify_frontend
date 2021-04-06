import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chant } from '../models/chant.model';

@Injectable({
  providedIn: 'root'
})
export class ChantFacadeService {

  constructor() { }

  private readonly _chant = new BehaviorSubject<any>(null);

  get chant(): any {
    return this._chant.getValue();
  }

  set chant(value: any) {
    this._chant.next(value);
  }

}
