import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlignmentService {

  constructor() { }

  private readonly _ids = new BehaviorSubject<number[]>(null);
  private _mode: string = null;
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
    this.storage.setItem('idsToAlign', JSON.stringify(ids));
  }

  getMode(): string {
    const storedMode = this.storage.getItem('alignmentMode');
    if (null === storedMode) {
      return 'full';
    }
    else {
      return storedMode;
    }
  }

  setMode(mode: string): number {
    if (mode != "full" && mode != "syllables" && mode != "intervals") {
      return 1;
    }

    this.storage.setItem('alignmentMode', mode);
    this._mode = mode;
    return 0;
  }
}
