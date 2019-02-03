import { Round } from './Round';

export class Workout {
  name: string;
  rounds: Round[];

  getDuration () {
    let iSum = 0;
    for (const round of this.rounds) {
      iSum += round.getDuration();
    }
    return iSum;
  }

  getDurationWithoutPauses () {
    let iSum = 0;
    for (const round of this.rounds) {
      iSum += round.getDurationWithoutPause();
    }
    return iSum;
  }

  constructor (name: string, rounds: Round[]) {
    this.name = name;
    this.rounds = rounds;
  }
}
