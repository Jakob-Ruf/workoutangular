import { Injectable } from '@angular/core';
import { Workout } from './classes/Workout';
import * as staticData from '../assets/data.json';
import { SerializerService } from './serializer.service';
import { HelperService } from './helper.service';
import { getJSDocThisTag } from 'typescript';
import { SettingsService } from './settings.service';


@Injectable({
  providedIn: 'root'
})



export class ModelService {

  private workout: Workout;
  private activeNav: number;
  private workouts: Workout[];
  private lastFetch: Date = new Date(0);

  constructor(
    private helper: HelperService,
    private settings: SettingsService
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
    const that = this;
    const THRESHOLD = this.settings.get('RefetchThreshold') || 1000 * 60 * 10;
    if (this.workouts && (new Date().getTime() - this.lastFetch.getTime()) < THRESHOLD ) {
      fnCallback(this.workouts);
    } else {
      this.helper.getFirebase().firestore().collection('prebuilt_workouts').get().then(function(snapshot){
        for (const workout of snapshot.docs){
          workouts.push(serializer.deserializeWorkout(workout.data()));
        }
        that.workouts = workouts;
        that.lastFetch = new Date();
        fnCallback(workouts);
      });
    }
  }
}
