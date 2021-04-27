import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlignmentService {

  constructor() { }

  private readonly _ids = new BehaviorSubject<number[]>(null);

  getIds(): BehaviorSubject<number[]> {
    return this._ids;
  }

  setIds(ids: number[]): void {
    this._ids.next(ids);
  }
}
