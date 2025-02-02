import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TimerSummaryComponent } from './timer-summary.component';
import { TimerInterval, TimerIntervalStatus } from '../../api/timer-interval';
import { SharedIntervalService } from '../../../shared/shared-interval.service';

describe('TimerSummaryComponent', () => {
  let component: TimerSummaryComponent;
  let fixture: ComponentFixture<TimerSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerSummaryComponent],
      providers: [
        { provide: SharedIntervalService, useValue: { oneSecond$: of(1000) } }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TimerSummaryComponent);
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
