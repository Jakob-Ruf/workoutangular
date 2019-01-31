import { Component } from '@angular/core';
import { Action } from './classes/Action';
import { Exercise } from './classes/Exercise';
import { Pause } from './classes/Pause';
import { Round } from './classes/Round';
import { Workout } from './classes/Workout';
import * as lodash from 'lodash';
import { ModelService } from './model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'fullcontrol';
  workout: Workout = new Workout('Neu', []);
  newRound: Round = null;
  newAction: Action = null;
  roundIndex: number;
  exerciseIndex: number;
  audio = new Audio('../assets/Bell.wav');

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

  onPlayAudio () {
    this.audio.load();
    this.audio.play();
  }

  onCreate () {
    const rounds = [];
    for (let i = 0; i < 7; i++) {
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

  onTest () {
    this.roundIndex = 0;
    this.exerciseIndex = 0;
    this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex].isActive = true;
    setInterval(this.setNextActive.bind(this), 10000);
  }

  setNextActive () {
    this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex].isActive = false;
    if (this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex + 1]) {
      this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex + 1].isActive = true;
      this.exerciseIndex++;
    } else if (this.workout.rounds[this.roundIndex + 1] && this.workout.rounds[this.roundIndex + 1].exercises[0]) {
      this.exerciseIndex = 0;
      this.workout.rounds[this.roundIndex + 1].exercises[this.exerciseIndex].isActive = true;
      this.roundIndex++;
    }
    this.speak(this.roundIndex, this.exerciseIndex);
  }

  speak (round: number, exercise: number) {
    const text = this.workout.rounds[round].exercises[exercise].toString();
    const speech: SpeechSynthesis = window.speechSynthesis;
    const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);
    speech.speak(utterance);
  }



}
