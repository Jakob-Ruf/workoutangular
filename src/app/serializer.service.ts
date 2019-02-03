import { Injectable } from '@angular/core';
import { Workout } from './classes/Workout';
import { Round } from './classes/Round';
import { Pause } from './classes/Pause';
import { Exercise } from './classes/Exercise';
import { Action } from './classes/Action';

@Injectable({
  providedIn: 'root'
})
export class SerializerService {

  constructor() { }


  /**
   * deserialization from string to workout object
   * no JSON.parse since that loses prototype functions
   * @param input serialized workout string
   */
  deserializeWorkout (input: string): Workout {
    try {
      const oWorkout = JSON.parse(input);
      const aRounds = [];
      for (const round of oWorkout.rounds) {
        const aActions = [];
        for (const action of round.exercises) {
          aActions.push(
            action.isPause ?
            new Pause(action.duration) :
            new Exercise(action.name, action.duration, action.image, action.muscles, action.alternatives));
        }
        aRounds.push(new Round(aActions));
      }
      return new Workout(oWorkout.name, aRounds);
    } catch (err) {
      return new Workout('ERROR DESERIZALIZING WORKOUT', []);
    }
  }

  deserializeRound (input: string): Round {
    const round = JSON.parse(input);
    const actions: Action[] = [];
    for (const action of round.exercises) {
      actions.push(
        action.isPause ?
        new Pause(action.duration) :
        new Exercise(action.name, action.duration, action.image, action.muscles, action.alternatives));
    }
    return new Round(actions);
  }

  serialize (input: Workout): string {
    return JSON.stringify(input);
  }
}
