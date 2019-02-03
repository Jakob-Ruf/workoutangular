import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor() { }

  formatDuration (seconds: number) {
    let duration: string = '';
    duration += this.lpad(Math.floor(seconds / 60), 2);
    duration += ':';
    duration += this.lpad(seconds % 60, 2);
    return duration;
  }

  lpad (input: string | number, length: number, char: string = '0'): string {
    input = String(input);
    if (input.length < length) {
      return this.lpad(char + input, length, char);
    } else {
      return input;
    }
  }
}
