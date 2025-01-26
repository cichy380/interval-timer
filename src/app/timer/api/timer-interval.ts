import { TimeValue } from './time-value';


export enum TimerIntervalStatus {
  PRISTINE,
  RUNNING,
  DONE,
}

export class TimerInterval {
  public datetimeStart?: TimeValue
  public datetimeEnd?: TimeValue

  constructor(
    public number: number,
    public status: TimerIntervalStatus = TimerIntervalStatus.PRISTINE
  ) {
  }
}

// TODO: RunningTimerInterval and DoneTimerInterval
// export class RunningTimerInterval extends TimerInterval {
//   public datetimeStart: TimeValue
// }
//
// export class DoneTimerInterval extends TimerInterval {
//   public datetimeEnd: TimeValue
// }
