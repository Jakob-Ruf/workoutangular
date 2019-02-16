import { Component, OnInit } from '@angular/core';
import { ModelService } from '../model.service';
import { Workout } from '../classes/Workout';
import { HelperService } from '../helper.service';
import { Action } from '../classes/Action';
import { Exercise } from '../classes/Exercise';
import { Pause } from '../classes/Pause';
import { FormatterService } from '../formatter.service';

@Component({
  selector: 'app-active-workout',
  templateUrl: './active-workout.component.html',
  styleUrls: ['./active-workout.component.less']
})
export class ActiveWorkoutComponent implements OnInit {
  workout: Workout;
  roundIndex: number = 0;
  exerciseIndex: number = 0;
  activeAction: Action = new Pause(60);
  isRunning: boolean = false;
  hasStarted: boolean = false;
  settings = {
    sound: true,
    speak: true
  }
  status = {
    ticks : 0,
    myString : '',
    timeRemaining: 0
  };
  timer: any = null;

  constructor(
    private modelService: ModelService,
    private helper: HelperService,
    public formatter: FormatterService
    ) { }

  ngOnInit() {
    this.workout = this.modelService.getWorkout();
    if (this.workout.getDuration() === 0) {
      this.workout = this.modelService.getSavedWorkouts()[0];
    }
  }

  start (): void {
    this.setNextActive(true);
    this.setupTimer();
    this.playBell();
    this.startNextTimer();
  }

  setNextActive (firstStart: boolean): boolean {
    if (firstStart) { /*initially set active workout*/
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

  playTenSeconds(): void {
    if (this.activeAction.isPause) {
      let exercise = this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex + 1];
      if (!exercise && this.workout.rounds[this.roundIndex + 1]) {
        exercise = this.workout.rounds[this.roundIndex + 1].exercises[this.exerciseIndex];
      }
      const text = exercise.toString();
      const speech: SpeechSynthesis = window.speechSynthesis;
      const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en';
      speech.speak(utterance);
    } else {
      const audio = new Audio('assets/Clock.wav');
      audio.load();
      audio.play();
    }
  }

  setupTimer (): void {
    this.timer = this.helper.getTimer();
    this.timer.on('tick', () => this.onTick.bind(this)());
    this.timer.on('done', () => this.nextRound.bind(this)());
  }

  onTick (): void{
    this.status.timeRemaining -= 1;
    if (this.status.timeRemaining === 10) {
      this.playTenSeconds();
    }
    this.status.ticks++;
  }

  startNextTimer (): void{
    this.timer.stop();
    this.status.ticks = 0;
    const duration = this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex].duration;
    this.status.timeRemaining = duration + 1;
    this.timer.start(duration * 1000);
  }

  nextRound (): void {
    this.playBell();
    this.timer.stop();
    if (this.setNextActive(false)) {
      this.startNextTimer();
    } else {
      this.activeAction = new Exercise('DONE', 0);
    }
  }

  playBell (): void {
    const audio = new Audio('assets/Bell2.wav');
    audio.load();
    audio.play();
  }

  onClickStartPause (): void {
    if (!this.hasStarted) {
      this.start();
      this.isRunning = true;
      this.hasStarted = true;
    } else if (this.isRunning) {
      this.timer.pause();
      this.isRunning = false;
    } else {
      this.timer.resume();
      this.isRunning = true;
    }
  }

  onToggleSound () {
    this.settings.sound = !this.settings.sound;
  }

  onToggleSpeak () {
    this.settings.speak = !this.settings.speak;
  }

}
