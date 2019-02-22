import { Component, OnInit } from '@angular/core';
import { ModelService } from '../model.service';
import { Workout } from '../classes/Workout';

@Component({
  selector: 'app-load-workout',
  templateUrl: './load-workout.component.html',
  styleUrls: ['./load-workout.component.less']
})
export class LoadWorkoutComponent implements OnInit {
  workouts: Workout[] = [];

  constructor(private model: ModelService) { }

  ngOnInit() {
    this.workouts = this.model.getSavedWorkouts();
  }

  onActivateWorkout (workout: Workout) {
    this.model.setWorkout(workout);
  }

}
