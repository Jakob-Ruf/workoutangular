import { Component, OnInit } from '@angular/core';
import { ModelService } from '../model.service';
import { Workout } from '../classes/Workout';
import { HelperService } from '../helper.service';
import { Action } from '../classes/Action';
import { Exercise } from '../classes/Exercise';

@Component({
  selector: 'app-active-workout',
  templateUrl: './active-workout.component.html',
  styleUrls: ['./active-workout.component.less']
})
export class ActiveWorkoutComponent implements OnInit {
  workout: Workout;
  roundIndex = 0;
  exerciseIndex = 0;
  activeAction: Action;
  status = {
    ticks : 0,
    myString : '',
    timeRemaining: 0
  };
  timer: any;

  constructor(private modelService: ModelService, private helper: HelperService) { }

  ngOnInit() {
    this.workout = this.modelService.getWorkout();
  }

  start () {
    this.setNextActive();
    this.setupTimer();
    this.startNextTimer();
  }

  setNextActive () {
    if (!this.activeAction) { /*initially set active workout*/
      this.activeAction = this.workout.rounds[0].exercises[0];
      this.workout.rounds[0].exercises[0].isActive = true;
      this.roundIndex = 0;
      this.exerciseIndex = 0;
      return true;
    }
    this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex].isActive = false;
    if (this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex + 1]) {
      this.exerciseIndex++;
    } else if (this.workout.rounds[this.roundIndex + 1] && this.workout.rounds[this.roundIndex + 1].exercises[0]) {
      this.exerciseIndex = 0;
      this.roundIndex++;
    } else {
      this.exerciseIndex++;
      this.roundIndex++;
    }
    if (this.workout.rounds[this.roundIndex] && this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex]) {
      this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex].isActive = true;
      this.activeAction = this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex];
      return true;
    }
    return false;
  }

  playTenSeconds() {
    if (this.activeAction.isPause) {
      let exercise = this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex + 1];
      if (!exercise && this.workout.rounds[this.roundIndex + 1]) {
        exercise = this.workout.rounds[this.roundIndex + 1].exercises[this.exerciseIndex];
      }
      const text = exercise.toString();
      const speech: SpeechSynthesis = window.speechSynthesis;
      const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);
      speech.speak(utterance);
    } else {
      const audio = new Audio('assets/Clock.wav');
      audio.load();
      audio.play();
    }
  }

  setupTimer () {
    this.timer = this.helper.getTimer();
    this.timer.on('tick', () => this.onTick.bind(this)());
    this.timer.on('done', () => this.nextRound.bind(this)());
  }

  onTick () {
    this.status.timeRemaining -= 1;
    if (this.status.timeRemaining === 10) {
      this.playTenSeconds();
    }
    this.status.ticks++;
  }

  startNextTimer () {
    this.timer.stop();
    this.status.ticks = 0;
    const duration = this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex].duration;
    this.status.timeRemaining = duration + 1;
    this.timer.start(duration * 1000);
  }

  nextRound () {
    this.playBell();
    this.timer.stop();
    if (this.setNextActive()) {
      this.startNextTimer();
    } else {
      this.activeAction = new Exercise('DONE', 0);
    }
  }

  playBell () {
    const audio = new Audio('assets/Bell2.wav');
    audio.load();
    audio.play();
  }


}
