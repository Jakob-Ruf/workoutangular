import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { ActiveWorkoutComponent } from './active-workout/active-workout.component';
import { LoadWorkoutComponent } from './load-workout/load-workout.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: 'new', component: NewWorkoutComponent },
  { path: 'active', component: ActiveWorkoutComponent},
  { path: 'load', component: LoadWorkoutComponent},
  { path: 'start', component: StartComponent},
  { path: '', redirectTo: 'start', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
