import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCaloriesComponent } from './display-calories.component';

describe('DisplayCaloriesComponent', () => {
  let component: DisplayCaloriesComponent;
  let fixture: ComponentFixture<DisplayCaloriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCaloriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCaloriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
