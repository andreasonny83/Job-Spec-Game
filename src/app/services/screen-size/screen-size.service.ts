import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ScreenSizeService {
  width$: Observable<number>;
  height$: Observable<number>;

  constructor() {
    let windowSize$ = this.createWindowSize$();
    this.width$ = (windowSize$.pluck('width') as Observable<number>).distinctUntilChanged();
    this.height$ = (windowSize$.pluck('height') as Observable<number>).distinctUntilChanged();
  }

  createWindowSize$() {
    Observable.fromEvent(window, 'resize')
      .map(this.getWindowSize)
      .startWith(this.getWindowSize())
      .publishReplay(1)
      .refCount();
  }

  getWindowSize() {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }
}
