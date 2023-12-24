import { Observable } from 'rxjs';
import { TimerStatus } from './timer-status';
import { TimeValue } from './time-value';


export abstract class Timer {

  abstract selectAllValues(): Observable<TimeValue[]>

  abstract selectCurrentIntervalValue(): Observable<TimeValue>

  abstract selectCurrentIntervalIndex(): Observable<number>

  abstract selectSummaryTime(): Observable<TimeValue>

  abstract selectCurrentStatus(): Observable<TimerStatus>

  abstract startTimer(): void

  abstract stopTimer(): void

  abstract pauseTimer(): void

  abstract continueTimer(): void

  abstract nextIteration(): void

  abstract initializeTimer(intervalCount: number): void
}
