import { Injectable } from '@angular/core';
import Timer from 'tiny-timer';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  timer: any;

  constructor() { }

  getTimer () {
    if (!this.timer) {
      this.timer = new Timer([{interval: 1000, stopwatch: false}]);
    }
    return this.timer;
  }
}
