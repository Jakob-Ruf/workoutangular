import { Component, OnInit } from '@angular/core';
import { Action } from '../classes/Action';
import { Exercise } from '../classes/Exercise';
import { Pause } from '../classes/Pause';
import { Round } from '../classes/Round';
import { Workout } from '../classes/Workout';
import * as lodash from 'lodash';
import { ModelService } from '../model.service';
import { SerializerService } from '../serializer.service';
import { FormatterService } from '../formatter.service';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.less']
})
export class NewWorkoutComponent implements OnInit {
  workout: Workout = new Workout('Neu', []);
  newRound: Round = null;
  newAction: Action = null;
  roundIndex: number;
  exerciseIndex: number;
  addWarmup: boolean;

  constructor(private modelService: ModelService, public formatter: FormatterService) { }

  ngOnInit() {
  }

  deleteAction (round: number, action: number) {
    this.workout.rounds[round].exercises.splice(action, 1);
  }

  deleteRound (round: number) {
    this.workout.rounds.splice(round, 1);
  }

  addExercise (index: number) {
    this.roundIndex = index;
    this.newAction = new Exercise('', 0);
  }

  addPause (index: number) {
    this.roundIndex = index;
    this.newAction = new Pause(0);
  }

  addRound () {
    this.workout.rounds.push(new Round([]));
  }

  duplicateRound (roundIndex: number) {
    const round: Round = lodash.cloneDeep(this.workout.rounds[roundIndex]);
    this.workout.rounds.push(round);
  }

  onClickConfirmAdd () {
    this.workout.rounds[this.roundIndex].exercises.push(this.newAction);
    this.roundIndex = null;
    this.newAction = null;
  }

  onChangeDuration (change: number) {
    if ((change < 0 && this.newAction.duration <= 0) || this.newAction.duration + change < 0) {
      return;
    }
    this.newAction.duration += change;
  }

  onKeyUpNewAction (event: any) {
    this.newAction.name = event.target.value;
  }

  onClickCancelAdd () {
    this.roundIndex = null;
    this.newAction = null;
  }


  onCreate () {
    const rounds = [];
    for (let i = 0; i < 3; i++) {
      rounds.push(new Round([
        new Exercise('Push ups', 10),
        new Pause(10),
        new Exercise('Push ups', 10),
        new Pause(10),
        new Exercise('Push ups', 10),
        new Pause(10),
      ]));
    }
    this.workout.rounds = rounds;
  }

  onConfirmWorkoutCreation () {
    const serialized = this.serializer.serialize(this.workout);
    const workout = this.serializer.deserialize(serialized);
    this.modelService.setWorkout(workout);
  }


}
