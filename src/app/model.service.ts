import { Injectable } from '@angular/core';
import {Workout} from './classes/Workout';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  workout: Workout;
  constructor() {
    // this.workout = new Workout();
  }
}
