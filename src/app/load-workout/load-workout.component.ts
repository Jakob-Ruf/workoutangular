import { Component, OnInit } from '@angular/core';
import { ModelService } from '../model.service';
import { Workout } from '../classes/Workout';
import { HelperService } from '../helper.service';
import * as staticData from '../../assets/data.json';

@Component({
  selector: 'app-load-workout',
  templateUrl: './load-workout.component.html',
  styleUrls: ['./load-workout.component.less']
})
export class LoadWorkoutComponent implements OnInit {
  workouts: Workout[] = [];
  database: any = null;

  constructor(
    private model: ModelService
    , private helper: HelperService
    ) { }

  ngOnInit() {
    this.model.getSavedWorkouts(function(workouts: Workout[]){
      this.workouts = workouts;
    });
  }

  onActivateWorkout (workout: Workout) {
    this.model.setWorkout(workout);
  }

}
