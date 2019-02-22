import { Injectable } from '@angular/core';
import { Workout } from './classes/Workout';
import * as staticData from '../assets/data.json';
import { SerializerService } from './serializer.service';


@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private workout: Workout;
  private activeNav: number;

  constructor() {}

  getWorkout () {
    return this.workout || new Workout('NEW', []);
  }

  setWorkout (workout: Workout) {
    this.workout = workout;
  }

  getActiveNav () {
    return this.activeNav;
  }

  setActiveNav (nav: number) {
    this.activeNav = nav;
  }

  getSavedWorkouts () {
    const serializer = new SerializerService();
    let workout: Workout;
    let workoutTemp: any;
    let workoutString: string;
    const workouts: Workout[] = [];
    for (workoutTemp of staticData.workouts) {
      workoutString = JSON.stringify(workoutTemp);
      workout = serializer.deserializeWorkout(workoutString);
      workouts.push(workout);
    }
    return workouts;
  }
}
