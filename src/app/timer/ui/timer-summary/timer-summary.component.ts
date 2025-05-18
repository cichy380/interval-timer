import { Component, Input, OnInit } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { FormatTimePipe } from '../../../shared/format-time.pipe'
import { iif, map, Observable, of, switchMap } from 'rxjs'
import { TimerInterval } from '../../api/timer-interval'
import { SharedIntervalService } from '../../../shared/shared-interval.service'
import { TimerIntervalUtils } from '../../infrastructure/TimerIntervalUtils';


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
  // TODO: TimerInterval[] instead of Observable<TimerInterval[]>
  @Input({ required: true }) timeIntervals$!: Observable<TimerInterval[]>

  value$!: Observable<number>

  constructor(private readonly sharedIntervalService: SharedIntervalService) {
  }

  ngOnInit() {
    this.value$ = this.timeIntervals$.pipe(
      map(timeIntervals => ({
        runningTimeInterval: TimerIntervalUtils.getRunningTimeInterval(timeIntervals),
        doneTimeIntervalsSum: TimerIntervalUtils.calculateWorkoutTime(timeIntervals),
      })),
      switchMap(({ runningTimeInterval, doneTimeIntervalsSum }) => iif(
        () => !!runningTimeInterval,
        this.sharedIntervalService.oneSecond$.pipe(
          map(_ => doneTimeIntervalsSum + TimerIntervalUtils.getRunningTimeIntervalDuration(runningTimeInterval!))
        ),
        of(doneTimeIntervalsSum),
      ))
    )
  }
}
