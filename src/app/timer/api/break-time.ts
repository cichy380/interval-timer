import { Observable } from 'rxjs';
import { TimeValue } from './time-value';

export abstract class BreakTime {

  abstract selectValue(): Observable<TimeValue>

  abstract selectBreakEnded(): Observable<void>

  abstract startBreak(): void

  abstract stopBreak(): void

  abstract initializeBreak(breakLength: TimeValue): void

}
