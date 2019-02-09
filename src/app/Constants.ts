export class Constants {
  routeActive = '/active';
  routeLoad = '/load';
  routeNew = '/new';
  newWorkoutTitle = 'New Workout';

  get(name: string) {
    return this[name];
  }
}
