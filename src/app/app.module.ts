import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { ActiveWorkoutComponent } from './active-workout/active-workout.component';
import { LoadWorkoutComponent } from './load-workout/load-workout.component';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    NewWorkoutComponent,
    ActiveWorkoutComponent,
    LoadWorkoutComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
