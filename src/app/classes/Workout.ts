import {Round} from './Round';
import {Exercise} from './Exercise';

export class Workout {
  name: string;
  rounds: Round[];

  // getDuration () {
  //   this.rounds.reduce((a, b) => new Round([new Exercise('', a.getDuration() + b.getDuration())])).getDuration();
  // }

  getDuration () {
    let iSum = 0;
    for (const round of this.rounds) {
      iSum += round.getDuration();
    }
    return iSum;
  }

  constructor (name: string, rounds: Round[]) {
    this.name = name;
    this.rounds = rounds;
  }
}
