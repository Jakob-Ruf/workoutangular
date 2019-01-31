import {Action} from './Action';
import {Muscle} from './Muscle';

export class Exercise extends Action {
  isPause = false;
  muscles: Muscle[];
  alternatives: Exercise[];

  constructor(name: string, duration: number, image?: string, muscles?: Muscle[], alternatives?: Exercise[]) {
    super(name, duration, image, false);
    this.muscles = muscles;
    this.alternatives = alternatives;
  }

  toString() {
    return `${this.name}: ${this.duration} seconds`;
  }
}
