import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TimerInterval, TimerIntervalStatus } from '../../api/timer-interval';
import { FormatTimePipe } from '../../../shared/format-time.pipe';

@Component({
  selector: 'app-timer-average',
  standalone: true,
  imports: [
    FormatTimePipe
  ],
  templateUrl: './timer-average.component.html',
  styleUrl: './timer-average.component.css'
})
export class TimerAverageComponent implements OnInit, OnDestroy {
  @Input({ required: true }) timeIntervals!: TimerInterval[];

  value = 0;

  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit() {
    // TODO: shared interval service
    this.intervalId = setInterval(() => this.value = this.calculateTimeIntervalsAvg(), 1000);
  }

  private calculateTimeIntervalsAvg() {
    const doneIntervals = this.timeIntervals.filter(interval => interval.status === TimerIntervalStatus.DONE);
    const totalDuration = doneIntervals.reduce((acc, interval) => acc + this.getDoneIntervalDuration(interval), 0);
    return doneIntervals.length > 0 ? Math.round(totalDuration / doneIntervals.length) : 0;
  }

  private getDoneIntervalDuration(interval: TimerInterval) {
    return Math.floor((interval.datetimeEnd! - interval.datetimeStart!) / 1000)
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
