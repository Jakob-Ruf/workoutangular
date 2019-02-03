import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadWorkoutComponent } from './load-workout.component';

describe('LoadWorkoutComponent', () => {
  let component: LoadWorkoutComponent;
  let fixture: ComponentFixture<LoadWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
