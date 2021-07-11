import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncipitService {

  private _incipit = new BehaviorSubject<string>("");

  constructor() { }

  getIncipit(): BehaviorSubject<string> {
    return this._incipit;
  }

  setIncipit(string): void {
    this._incipit.next(string);
  }
}
