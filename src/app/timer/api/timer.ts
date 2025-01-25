import { Observable } from 'rxjs';
import { TimerStatus } from './timer-status';
import { TimeValue } from './time-value';
import { IntervalTime } from './interval-time';


export abstract class Timer {

  abstract selectIntervals(): Observable<IntervalTime[]>

  abstract selectAllValues(): Observable<TimeValue[]>

  abstract selectCurrentIntervalValue(): Observable<TimeValue>

  abstract selectCurrentIntervalIndex(): Observable<number>

  abstract selectSummaryTime(): Observable<TimeValue>

  abstract selectAverageTime(): Observable<TimeValue>

  abstract selectCurrentStatus(): Observable<TimerStatus>

  abstract startFirstInterval(): void

  abstract stopCurrentInterval(): void

  abstract startNextInterval(): void

  abstract stopTimer(): void

  abstract pauseTimer(): void

  abstract continueTimer(): void

  abstract nextIteration(): void

  abstract initializeTimer(intervalCount: number): void
}
