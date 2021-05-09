import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Chant } from '../models/chant.model';
import { ChantService } from './chant.service';
import { IChant } from '../interfaces/chant.interface';
import { IChantPrecomputed } from '../interfaces/chant-precomputed.interface';

@Injectable({
  providedIn: 'root'
})
export class ChantFacadeService {

  constructor() { }

  private readonly _chant = new Subject<IChant>();
  private readonly _chantPrecomputed = new Subject<IChantPrecomputed>();
  private readonly _chantList = new BehaviorSubject<IChant[]>(null);

  // get chant(): any {
  //   return this._chant.getValue();
  // }

  // set chant(value: any) {
  //   this._chant.next(value);
  // }

  getChant(): Subject<IChant> {
    return this._chant;
  }

  setChant(chant: IChant): void {
    this._chant.next(chant);
  }

  getChantPrecomputed(): Subject<IChantPrecomputed> {
    return this._chantPrecomputed;
  }

  setChantPrecomputed(chant: IChantPrecomputed): void {
    this._chantPrecomputed.next(chant);
  }

  getList(): BehaviorSubject<IChant[]> {
    return this._chantList;
  }

  setList(list: IChant[]): void {
    this._chantList.next(list);
  }

}
