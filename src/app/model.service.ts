import { Injectable } from '@angular/core';
import {Workout} from './classes/Workout';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  workout: Workout;
  constructor() {}
  getWorkout () {
    return this.workout;
  }
  setWorkout (workout: Workout) {
    this.workout = workout;
  }
}
