import { Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, combineLatest, map } from 'rxjs'
import { Timer } from '../api/timer'
import { TimerStatus } from '../api/timer-status'
import { TimerValue } from '../api/timer-value'


@Injectable()
export class TimerService implements Timer, OnDestroy {

  private allValues$ = new BehaviorSubject<TimerValue[]>([])
  private currentIntervalIndex$ = new BehaviorSubject<number>(-1)
  private summaryTime$ = new BehaviorSubject<TimerValue>(0)
  private currentStatus$ = new BehaviorSubject<TimerStatus>(TimerStatus.NOT_LAUNCHED)

  private intervalCount!: number
  private intervalId!: ReturnType<typeof setInterval>

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

  selectCurrentStatus() {
    return this.currentStatus$.asObservable()
  }

  initializeTimer(intervalCount: number) {
    this.intervalCount = intervalCount
    this.resetTimer()
  }

  startTimer() {
    if (!this.intervalCount) {
      throw new Error('Missing intervalCount value. Use Timer.setIntervalCount() method.')
    }

    this.resetTimer()
    this.currentIntervalIndex$.next(0)
    this.currentStatus$.next(TimerStatus.RUNNING)
    this.startInterval()
  }

  stopTimer() {
    this.currentStatus$.next(TimerStatus.STOPPED)
    this.stopInterval()
  }

  nextIteration() {
    let currentIntervalIndex = this.currentIntervalIndex$.getValue()
    this.currentIntervalIndex$.next(currentIntervalIndex + 1)
  }

  private resetTimer() {
    this.allValues$.next(new Array(this.intervalCount).fill(0))
    this.currentIntervalIndex$.next(-1)
    this.summaryTime$.next(0)
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

    this.allValues$.next(allValues)
    this.summaryTime$.next(
      allValues.reduce((partialSum, a) => partialSum + a, 0)
    )
  }

  ngOnDestroy() {
    this.stopInterval()
  }

}
