import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveWorkoutComponent } from './active-workout.component';

describe('ActiveWorkoutComponent', () => {
  let component: ActiveWorkoutComponent;
  let fixture: ComponentFixture<ActiveWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
