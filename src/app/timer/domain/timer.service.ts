import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Timer } from '../api/timer';
import { TimerStatus } from '../api/timer-status';
import { TimerValue } from '../api/timer-value';


@Injectable()
export class TimerService implements Timer, OnDestroy {

  private allValues$ = new BehaviorSubject<TimerValue[]>([])
  private currentIntervalIndex$ = new BehaviorSubject<number>(0)
  private summaryTime$ = new BehaviorSubject<TimerValue>(0)
  private currentStatus$ = new BehaviorSubject<TimerStatus>(TimerStatus.NOT_LAUNCHED)

  private nextIteration$ = new BehaviorSubject(true)

  private intervalCount!: number
  private intervalId!: ReturnType<typeof setInterval>

  constructor() {
  }

  selectAllValues() {
    return this.allValues$.asObservable()
  }

  selectCurrentIntervalValue() {
    return combineLatest([this.allValues$, this.nextIteration$])
      .pipe(
        map(
          ([allValues]) => allValues[this.currentIntervalIndex$.getValue()] || 0
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

  startTimer() {
    if (!this.intervalCount) {
      throw new Error('Missing intervalCount value. Use Timer.setIntervalCount() method.')
    }

    this.resetTimer()
    this.currentStatus$.next(TimerStatus.RUNNING)
    this.intervalId = setInterval(() => this.increaseTimerByOneSecond(), 1000)
  }

  stopTimer() {
    this.clearInterval()
  }

  private resetTimer() {
    this.allValues$.next(new Array(this.intervalCount).fill(0))
    this.currentIntervalIndex$.next(0)
    this.summaryTime$.next(0)
  }

  nextIteration() {
    // TODO check if last iteration
    this.currentIntervalIndex$.next(this.currentIntervalIndex$.getValue() + 1)
    this.nextIteration$.next(true)
  }

  setIntervalCount(intervalCount: number) {
    this.intervalCount = intervalCount;
  }

  private clearInterval() {
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
    this.clearInterval()
  }

}
