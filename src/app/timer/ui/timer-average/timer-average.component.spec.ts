import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TimerAverageComponent } from './timer-average.component';
import { TimerInterval, TimerIntervalStatus } from '../../api/timer-interval';

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
    component.timeIntervals$ = of([
      { status: TimerIntervalStatus.DONE, datetimeStart: 0, datetimeEnd: 1000 } as TimerInterval,
      { status: TimerIntervalStatus.DONE, datetimeStart: 2000, datetimeEnd: 3000 } as TimerInterval
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
