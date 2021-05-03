import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chant } from '../models/chant.model';
import { ChantService } from './chant.service';
import { IChant } from '../interfaces/chant.interface';

@Injectable({
  providedIn: 'root'
})
export class ChantFacadeService {

  constructor() { }

  private readonly _chant = new BehaviorSubject<IChant>(null);

  // get chant(): any {
  //   return this._chant.getValue();
  // }

  // set chant(value: any) {
  //   this._chant.next(value);
  // }

  getChant(): any {
    return this._chant;
  }

  setChant(chant: IChant): void {
    this._chant.next(chant);
  }

}
