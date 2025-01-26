import { Observable } from 'rxjs';
import { TimerStatus } from './timer-status';
import { TimerInterval } from './timer-interval';


export abstract class Timer {

  abstract selectIntervals(): Observable<TimerInterval[]>

  abstract selectLastDoneInterval(): Observable<TimerInterval | undefined>

  abstract selectRunningInterval(): Observable<TimerInterval | undefined>

  abstract selectTimerStatus(): Observable<TimerStatus>

  abstract startTimer(): void

  abstract stopRunningInterval(): void

  abstract startNextInterval(): void

  abstract initializeTimer(intervalCount: number): void
}
