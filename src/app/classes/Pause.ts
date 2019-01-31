import {Action} from './Action';
export class Pause extends Action {
  constructor(duration: number) {
    super('Pause', duration, 'img/pause.png', true);
  }

  toString () {
    return this.name;
  }
}
