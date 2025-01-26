import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormatTimePipe } from '../../../shared/format-time.pipe';
import { TimerInterval, TimerIntervalStatus } from '../../api/timer-interval';


@Component({
  selector: 'app-timer-summary',
  standalone: true,
  imports: [
    FormatTimePipe
  ],
  templateUrl: './timer-summary.component.html',
  styleUrl: './timer-summary.component.css'
})
export class TimerSummaryComponent implements OnInit, OnDestroy {
  @Input({ required: true }) timeIntervals!: TimerInterval[];

  value = 0;

  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit() {
    // TODO: shared interval service
    this.intervalId = setInterval(() => this.value = this.calculateTimeIntervalsSum(), 1000);
  }

  private calculateTimeIntervalsSum() {
    return this.timeIntervals.reduce((acc, interval) => {
      if (interval.status === TimerIntervalStatus.DONE) {
        return acc + this.getDoneIntervalDuration(interval);
      }
      if (interval.status === TimerIntervalStatus.RUNNING) {
        return acc + this.getRunningIntervalDuration(interval);
      }
      return acc;
    }, 0);
  }

  private getDoneIntervalDuration(interval: TimerInterval) {
    return Math.floor((interval.datetimeEnd! - interval.datetimeStart!) / 1000)
  }

  private getRunningIntervalDuration(interval: TimerInterval) {
    return Math.floor((Date.now() - interval.datetimeStart!) / 1000)
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
