import { Component, OnInit } from '@angular/core';
import { ModelService } from '../model.service';
import { Workout } from '../classes/Workout';
import { HelperService } from '../helper.service';
import { Action } from '../classes/Action';
import { Exercise } from '../classes/Exercise';
import { Pause } from '../classes/Pause';
import { FormatterService } from '../formatter.service';
import { SettingsService } from '../settings.service';

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
  audio = {
    bell: new Audio('assets/Bell2.wav'),
    clock: new Audio('assets/Clock.wav')
  }

  constructor(
    private modelService: ModelService,
    private helper: HelperService,
    public formatter: FormatterService,
    private settingsService: SettingsService
    ) { }

  ngOnInit() {
    this.workout = this.modelService.getWorkout();
    if (this.workout.getDuration() === 0) {
      this.workout = this.modelService.getSavedWorkouts()[0];
    }
    this.audio.bell.load();
    this.audio.clock.load();
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
      if (this.settings.speak) {
        console.log('speaking');
        let exercise = this.workout.rounds[this.roundIndex].exercises[this.exerciseIndex + 1];
        if (!exercise && this.workout.rounds[this.roundIndex + 1]) {
          exercise = this.workout.rounds[this.roundIndex + 1].exercises[this.exerciseIndex];
        }
        const text = exercise.toString();
        const speech: SpeechSynthesis = window.speechSynthesis;
        const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en';
        speech.speak(utterance);
      }
    } else if (this.settings.sound) {
      console.log('Playing sound clock');
      this.audio.clock.play();
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
    if (this.settings.sound) {
      console.log('Playing bell')
      this.audio.bell.play();
    }
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
    console.log('Toggled sound settings');
    this.settings.sound = !this.settings.sound;
    this.settingsService.set('sound', this.settings.sound);
  }

  onToggleSpeak () {
    console.log('Toggled speak settings');
    this.settings.speak = !this.settings.speak;
    this.settingsService.set('speak', this.settings.speak);
  }

}
