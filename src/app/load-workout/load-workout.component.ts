import { Component, OnInit } from '@angular/core';
import { ModelService } from '../model.service';
import { Workout } from '../classes/Workout';
import { HelperService } from '../helper.service';
import { Router } from '@angular/router';
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
    , public router: Router
    ) { }

  ngOnInit() {
    const that = this;
    this.model.getSavedWorkouts(function(workouts: Workout[]){
      that.workouts = workouts;
    });
    // this.router = Router;
  }

  onActivateWorkout (workout: Workout) {
    this.model.setWorkout(workout);
    this.router.navigateByUrl('/active');
  }

}
