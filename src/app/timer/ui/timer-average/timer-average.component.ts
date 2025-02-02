import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { map, Observable } from 'rxjs'
import { FormatTimePipe } from '../../../shared/format-time.pipe'
import { TimerInterval, TimerIntervalStatus } from '../../api/timer-interval'


@Component({
  selector: 'app-timer-average',
  standalone: true,
  imports: [
    FormatTimePipe,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timer-average.component.html',
  styleUrl: './timer-average.component.css',
})
export class TimerAverageComponent implements OnInit {
  @Input({ required: true }) timeIntervals$!: Observable<TimerInterval[]>

  value$!: Observable<number>

  ngOnInit() {
    this.value$ = this.timeIntervals$.pipe(map(timeIntervals => this.calculateTimeIntervalsAvg(timeIntervals)))
  }

  calculateTimeIntervalsAvg(timeIntervals: TimerInterval[]) {
    const doneIntervals = timeIntervals.filter(interval => interval.status === TimerIntervalStatus.DONE)
    const totalDuration = doneIntervals.reduce((acc, interval) => acc + this.getDoneIntervalDuration(interval), 0)
    return doneIntervals.length > 0 ? Math.round(totalDuration / doneIntervals.length) : 0
  }

  private getDoneIntervalDuration(interval: TimerInterval) {
    return Math.floor((interval.datetimeEnd! - interval.datetimeStart!) / 1000)
  }

}
