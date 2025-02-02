import { Component, Input, OnInit } from '@angular/core'
import { FormatTimePipe } from '../../../shared/format-time.pipe'
import { TimerInterval, TimerIntervalStatus } from '../../api/timer-interval'
import { iif, map, Observable, of, switchMap } from 'rxjs'
import { SharedIntervalService } from '../../../shared/shared-interval.service'
import { AsyncPipe } from '@angular/common'


@Component({
  selector: 'app-timer-summary',
  standalone: true,
  imports: [
    FormatTimePipe,
    AsyncPipe,
  ],
  templateUrl: './timer-summary.component.html',
  styleUrl: './timer-summary.component.css',
})
export class TimerSummaryComponent implements OnInit {
  @Input({ required: true }) timeIntervals$!: Observable<TimerInterval[]>

  value$!: Observable<number>

  constructor(private readonly sharedIntervalService: SharedIntervalService) {
  }

  ngOnInit() {
    this.value$ = this.timeIntervals$.pipe(
      map(timeIntervals => ({
        timeIntervals,
        runningTimeInterval: this.getRunningTimeInterval(timeIntervals),
        doneTimeIntervalsSum: this.calculateDoneTimeIntervalsSum(timeIntervals),
      })),
      switchMap(({ timeIntervals, runningTimeInterval, doneTimeIntervalsSum }) => iif(
        () => !!runningTimeInterval,
        this.sharedIntervalService.oneSecond$.pipe(map(_ => doneTimeIntervalsSum + this.getRunningIntervalDuration(runningTimeInterval!))),
        of(doneTimeIntervalsSum),
      ))
    )
  }

  private calculateDoneTimeIntervalsSum(timeIntervals: TimerInterval[]) {
    return timeIntervals.reduce((acc, interval) => {
      if (interval.status === TimerIntervalStatus.DONE) {
        return acc + this.getDoneIntervalDuration(interval)
      }
      return acc
    }, 0)
  }

  private getDoneIntervalDuration(interval: TimerInterval) {
    return Math.floor((interval.datetimeEnd! - interval.datetimeStart!) / 1000)
  }

  private getRunningIntervalDuration(interval: TimerInterval) {
    return Math.floor((Date.now() - interval.datetimeStart!) / 1000)
  }

  private getRunningTimeInterval(timeIntervals: TimerInterval[]) {
    return timeIntervals.find(interval => interval.status === TimerIntervalStatus.RUNNING)
  }

}
