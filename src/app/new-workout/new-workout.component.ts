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
import * as staticData from '../../assets/data.json';
import { Router } from '@angular/router';
import { Constants } from '../Constants';


@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.less']
})
export class NewWorkoutComponent implements OnInit {
  workout: Workout = new Workout('Neu', []);
  newRound: Round = null;
  newAction: Action = null;
  roundIndex: number = 0;
  exerciseIndex: number = 0;
  addWarmup: boolean = false;
  constants: any = null;

  ACTIVE_ROUTE: string = '/active';

  constructor(
    private modelService: ModelService,
    public formatter: FormatterService,
    private serializer: SerializerService,
    public router: Router,
    ) { }

    ngOnInit() {
      this.workout = this.modelService.getWorkout();
      this.constants = new Constants();
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

  onConfirmWorkoutCreation () {
    if (this.addWarmup) {
      const warmup: Round = this.serializer.deserializeRound(JSON.stringify(staticData.warmup));
      this.workout.rounds.unshift(warmup);
    }
    this.workout.rounds.unshift(new Round([new Pause(10)]));
    this.modelService.setWorkout(this.workout);
    this.modelService.setActiveNav(1);
    this.router.navigateByUrl(this.constants.get('routeActive'));
  }


}
