import { Injectable, OnDestroy } from '@angular/core';
import { BreakTime } from '../api/break-time';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TimeValue } from '../api/time-value';


@Injectable()
export class BreakService implements BreakTime, OnDestroy {

  private value$ = new BehaviorSubject<TimeValue>(0)
  private breakEnded$ = new Subject<void>()

  private breakLength!: TimeValue
  private intervalId!: ReturnType<typeof setInterval>

  // TODO
  private isBreakRunning$ = new BehaviorSubject<boolean>(false)

  selectValue(): Observable<TimeValue> {
    return this.value$.asObservable()
  }

  selectIsBreakRunning(): Observable<boolean> {
    return this.isBreakRunning$.asObservable()
  }

  initializeBreak(breakLength: TimeValue) {
    this.breakLength = breakLength
    this.setInitialValue()
  }

  startBreak() {
    this.setInitialValue()
    this.startInterval()
    this.isBreakRunning$.next(true)
  }

  stopBreak() {
    this.stopInterval()
    this.breakEnded$.next()
    this.value$.next(0)
    this.isBreakRunning$.next(false)
  }

  selectBreakEnded(): Observable<void> {
    return this.breakEnded$.asObservable()
  }

  private startInterval() {
    this.intervalId = setInterval(() => this.increaseTimerByOneSecond(), 1000)
  }

  private stopInterval() {
    clearInterval(this.intervalId)
  }

  private increaseTimerByOneSecond() {
    let value = this.value$.getValue()
    value--
    if (value < 0) {
      this.stopBreak()
    } else {
      this.value$.next(value)
    }
  }

  private setInitialValue() {
    this.value$.next(this.breakLength)
  }

  ngOnDestroy() {
    this.stopInterval()
  }

}
