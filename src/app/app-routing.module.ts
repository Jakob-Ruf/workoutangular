import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewWorkoutComponent } from './new-workout/new-workout.component';

const routes: Routes = [
  { path: 'new', component: NewWorkoutComponent },
  // { path: 'active', component: ActiveWorkout},
  { path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
