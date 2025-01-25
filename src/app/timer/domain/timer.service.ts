import { Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, combineLatest, map } from 'rxjs'
import { Timer } from '../api/timer'
import { TimerStatus } from '../api/timer-status'
import { TimeValue } from '../api/time-value'
import { IntervalTime, IntervalTimeStatus } from '../api/interval-time';


@Injectable()
export class TimerService implements Timer, OnDestroy {

  private intervalTimes$ = new BehaviorSubject<IntervalTime[]>([])
  private nextIntervalIndex = 0

  private allValues$ = new BehaviorSubject<TimeValue[]>([])
  private currentIntervalIndex$ = new BehaviorSubject<number>(-1)
  private summaryTime$ = new BehaviorSubject<TimeValue>(0)
  private averageTime$ = new BehaviorSubject<TimeValue>(0)
  private currentStatus$ = new BehaviorSubject<TimerStatus>(TimerStatus.NOT_LAUNCHED)

  private intervalCount!: number
  private intervalId!: ReturnType<typeof setInterval>

  selectIntervals() {
    return this.intervalTimes$.asObservable()
  }

  selectAllValues() {
    return this.allValues$.asObservable()
  }

  selectCurrentIntervalValue() {
    return combineLatest([this.allValues$, this.currentIntervalIndex$])
      .pipe(
        map(
          ([allValues, currentIntervalIndex]) => allValues[currentIntervalIndex] || 0
        ),
      )
  }

  selectCurrentIntervalIndex() {
    return this.currentIntervalIndex$.asObservable()
  }

  selectSummaryTime() {
    return this.summaryTime$.asObservable()
  }

  selectAverageTime() {
    return this.averageTime$.asObservable()
  }

  selectCurrentStatus() {
    return this.currentStatus$.asObservable()
  }

  initializeTimer(intervalCount: number) {
    this.intervalCount = intervalCount
    this.resetTimer()
  }

  startFirstInterval() {
    if (!this.intervalCount) {
      throw new Error('Missing intervalCount value. Use Timer.initializeTimer() method.')
    }

    // this.resetTimer()
    // this.currentIntervalIndex$.next(0)

    this.startIntervalTimer(0)
    this.nextIntervalIndex = 1
    // this.currentStatus$.next(TimerStatus.RUNNING)
    // this.startInterval()
  }

  stopCurrentInterval() {
    const intervalTimes = this.intervalTimes$.getValue()
    const currentIntervalTimeIndex = intervalTimes.indexOf(
      intervalTimes.find(intervalTime => intervalTime.status === IntervalTimeStatus.RUNNING) as IntervalTime
    )
    this.stopIntervalTimer(currentIntervalTimeIndex)
    this.nextIntervalIndex++
    // const currentIntervalTime = intervalTimes.find(intervalTime => intervalTime.status === IntervalTimeStatus.RUNNING) as IntervalTime;
    // currentIntervalTime.datetimeEnd = Date.now()
    // currentIntervalTime.status = IntervalTimeStatus.DONE
  }

  startNextInterval() {
    this.startIntervalTimer(this.nextIntervalIndex)
  }

  private startIntervalTimer(index: number) {
    const intervalTimes = this.intervalTimes$.getValue()
    intervalTimes[index].datetimeStart = Date.now()
    intervalTimes[index].status = IntervalTimeStatus.RUNNING
    this.intervalTimes$.next(intervalTimes)
  }

  private stopIntervalTimer(index: number) {
    const intervalTimes = this.intervalTimes$.getValue()
    intervalTimes[index].datetimeEnd = Date.now()
    intervalTimes[index].status = IntervalTimeStatus.DONE
    this.intervalTimes$.next(intervalTimes)
  }

  stopTimer() {
    this.currentStatus$.next(TimerStatus.STOPPED)
    this.stopInterval()
  }

  pauseTimer() {
    this.currentStatus$.next(TimerStatus.BREAK)
    this.stopInterval()
  }

  continueTimer() {
    this.currentStatus$.next(TimerStatus.RUNNING)
    this.startInterval()
  }

  nextIteration() {
    let currentIntervalIndex = this.currentIntervalIndex$.getValue()
    this.currentIntervalIndex$.next(currentIntervalIndex + 1)
    this.continueTimer()
  }

  private resetTimer() {
    this.intervalTimes$.next(new Array(this.intervalCount).fill(null).map(_ => new IntervalTime()))

    // this.allValues$.next(new Array(this.intervalCount).fill(0))
    // this.currentIntervalIndex$.next(-1)
    // this.summaryTime$.next(0)
    // this.averageTime$.next(0)
    this.currentStatus$.next(TimerStatus.NOT_LAUNCHED)
  }

  private startInterval() {
    this.intervalId = setInterval(() => this.increaseTimerByOneSecond(), 1000)
  }

  private stopInterval() {
    clearInterval(this.intervalId)
  }

  private increaseTimerByOneSecond() {
    const allValues = this.allValues$.getValue()
    const currentIntervalIndex = this.currentIntervalIndex$.getValue()

    allValues[currentIntervalIndex]++

    this.allValues$.next(allValues) // TODO remove
    this.summaryTime$.next(
      allValues.reduce((partialSum, a) => partialSum + a, 0)
    )
    this.averageTime$.next(
      Math.round(allValues.reduce((partialSum, a, idx) => idx < currentIntervalIndex ? partialSum + a : partialSum, 0) / currentIntervalIndex) || 0
    )
  }

  ngOnDestroy() {
    this.stopInterval()
  }

}
