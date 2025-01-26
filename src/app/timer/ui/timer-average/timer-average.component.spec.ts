import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerAverageComponent } from './timer-average.component';

describe('TimerAverageComponent', () => {
  let component: TimerAverageComponent;
  let fixture: ComponentFixture<TimerAverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerAverageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimerAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
