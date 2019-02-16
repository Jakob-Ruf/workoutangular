import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  playSound: boolean = true;

  constructor() { }

  get(name: string) {
    return this[name];
  }

  set(name: string, value: any) {
    this[name] = value;
  }

}
