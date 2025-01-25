import { TimeValue } from './time-value';

export enum IntervalTimeStatus {
  PRISTINE,
  RUNNING,
  DONE,
}

export class IntervalTime {

  public datetimeStart?: TimeValue
  public datetimeEnd?: TimeValue
  public status: IntervalTimeStatus = IntervalTimeStatus.PRISTINE
}
