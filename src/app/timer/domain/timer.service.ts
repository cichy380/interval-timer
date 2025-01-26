import { Injectable } from '@angular/core'
import { BehaviorSubject, map } from 'rxjs'
import { Timer } from '../api/timer'
import { TimerStatus } from '../api/timer-status'
import { TimerInterval, TimerIntervalStatus } from '../api/timer-interval';


@Injectable()
export class TimerService implements Timer {

  private timerIntervals$ = new BehaviorSubject<TimerInterval[]>([])
  private status$ = new BehaviorSubject<TimerStatus>(TimerStatus.NOT_LAUNCHED)

  private intervalCount!: number

  selectIntervals() {
    return this.timerIntervals$.asObservable()
  }

  selectLastDoneInterval() {
    return this.timerIntervals$.pipe(
      map(intervals => intervals.slice().reverse().find(i => i.status === TimerIntervalStatus.DONE))
    )
  }

  selectRunningInterval() {
    return this.timerIntervals$.pipe(
      map(intervals => intervals.slice().reverse().find(i => i.status === TimerIntervalStatus.RUNNING))
    )
  }

  selectTimerStatus() {
    return this.status$.asObservable()
  }

  initializeTimer(intervalCount: number) {
    this.intervalCount = intervalCount
    this.timerIntervals$.next(new Array(this.intervalCount).fill(null).map((_, index) => new TimerInterval(index + 1)))
  }

  startTimer() {
    if (!this.intervalCount) {
      throw new Error('Missing intervalCount value. Use Timer.initializeTimer() method.')
    }

    this.startInterval(0)
    this.status$.next(TimerStatus.RUNNING)
  }

  stopRunningInterval() {
    const intervals = this.timerIntervals$.getValue()
    const runningIntervalIndex = intervals.indexOf(
      intervals.find(i => i.status === TimerIntervalStatus.RUNNING) as TimerInterval
    )
    this.stopInterval(runningIntervalIndex)

    if (runningIntervalIndex === this.intervalCount - 1) {
      this.status$.next(TimerStatus.STOPPED)
    } else {
      this.status$.next(TimerStatus.BREAK)
    }
  }

  startNextInterval() {
    const intervals = this.timerIntervals$.getValue()
    const firstPristineIntervalIndex = intervals.indexOf(
      intervals.find(i => i.status === TimerIntervalStatus.PRISTINE) as TimerInterval
    )
    this.status$.next(TimerStatus.RUNNING)
    this.startInterval(firstPristineIntervalIndex)
  }

  private startInterval(index: number) {
    const intervals = this.timerIntervals$.getValue()
    intervals[index].datetimeStart = Date.now()
    intervals[index].status = TimerIntervalStatus.RUNNING
    this.timerIntervals$.next(intervals)
  }

  private stopInterval(index: number) {
    const intervals = this.timerIntervals$.getValue()
    intervals[index].datetimeEnd = Date.now()
    intervals[index].status = TimerIntervalStatus.DONE
    this.timerIntervals$.next(intervals)
  }

}
