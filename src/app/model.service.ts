import { Injectable } from '@angular/core';
import { Workout } from './classes/Workout';
import * as staticData from '../assets/data.json';
import { SerializerService } from './serializer.service';
import { HelperService } from './helper.service';


@Injectable({
  providedIn: 'root'
})



export class ModelService {

  private workout: Workout;
  private activeNav: number;

  constructor(
    private helper: HelperService
  ) {}



  async getFirebaseWorkouts () {

  }

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

  getSavedWorkouts (fnCallback) {
    const serializer = new SerializerService();
    const workouts: Workout[] = [];
    this.helper.getFirebase().firestore().collection('prebuilt_workouts').get().then(function(snapshot){
      for (const workout of snapshot.docs){
        workouts.push(serializer.deserializeWorkout(workout.data()));
      }
      fnCallback(workouts);
    });
  }

}
