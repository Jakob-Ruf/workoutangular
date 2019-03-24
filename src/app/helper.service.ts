import { Injectable } from '@angular/core';
import Timer from 'tiny-timer';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  timer: any;
  mFirebase: any;

  constructor() { }

  getTimer () {
    if (!this.timer) {
      this.timer = new Timer([{interval: 1000, stopwatch: false}]);
    }
    return this.timer;
  }

  getFirebase () {
    if (!this.mFirebase) {
      this.mFirebase = firebase;
      var config = {
        apiKey: "AIzaSyCr69bs5nBKWroTmAcBejdrsj2sljMxmbQ",
        authDomain: "workout-backend.firebaseapp.com",
        databaseURL: "https://workout-backend.firebaseio.com",
        projectId: "workout-backend",
        storageBucket: "workout-backend.appspot.com",
        messagingSenderId: "552543247951"
      };
      firebase.initializeApp(config);
    }
    return this.mFirebase;
  }
}
