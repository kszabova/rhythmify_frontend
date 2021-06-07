import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlignmentService {

  constructor() { }

  private readonly _ids = new BehaviorSubject<number[]>(null);
  private storage = window.sessionStorage;

  get idsToAlign(): number[] {
    const storedIds = this.storage.getItem('idsToAlign');
    if (null === storedIds) {
      return [];
    }
    else {
      return JSON.parse(storedIds);
    }
  }

  set idsToAlign(ids: number[]) {
    console.log(ids);
    this.storage.setItem('idsToAlign', JSON.stringify(ids));
  }
}
