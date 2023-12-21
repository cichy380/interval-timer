import { Observable } from 'rxjs';
import { TimerStatus } from './timer-status';
import { TimerValue } from './timer-value';


export abstract class Timer {

  abstract selectAllValues(): Observable<TimerValue[]>

  abstract selectCurrentIntervalValue(): Observable<TimerValue>

  abstract selectCurrentIntervalIndex(): Observable<number>

  abstract selectSummaryTime(): Observable<TimerValue>

  abstract selectCurrentStatus(): Observable<TimerStatus>

  abstract startTimer(): void

  abstract stopTimer(): void

  abstract nextIteration(): void

  abstract initializeTimer(intervalCount: number): void
}
