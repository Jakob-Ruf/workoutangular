export abstract class Action {
  name: string;
  duration: number;
  image: string;
  isPause: boolean;
  isActive: boolean;

  abstract toString();

  constructor(name: string, duration: number, image: string, isPause: boolean) {
    this.name = name;
    this.duration = duration;
    this.image = image;
    this.isPause = isPause;
  }
}

