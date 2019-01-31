import {Action} from './Action';
import {Pause} from './Pause';

export class Round {
  exercises: Action[];


  getDuration () {
    return this.exercises
      .reduce((a, b) => new Pause(a.duration + b.duration), new Pause(0)).duration;
  }

  getDurationWithoutPause () {
    return this.exercises
      .filter(a => !a.isPause)
      .reduce((a, b) => new Pause(a.duration + b.duration), new Pause(0)).duration;
  }

  constructor(exercices: Action[]) {
    this.exercises = exercices;
  }
}

