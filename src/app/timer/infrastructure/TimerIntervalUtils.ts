import { TimerInterval, TimerIntervalStatus } from '../api/timer-interval';


export class TimerIntervalUtils {

  static calculateWorkoutTime(timeIntervals: TimerInterval[]) {
    return timeIntervals.reduce((acc, interval) => {
      if (interval.status === TimerIntervalStatus.DONE) {
        return acc + this.getDoneTimeIntervalDuration(interval)
      }
      return acc
    }, 0)
  }

  static getRunningTimeInterval(timeIntervals: TimerInterval[]) {
    return timeIntervals.find(interval => interval.status === TimerIntervalStatus.RUNNING)
  }

  static getDoneTimeIntervalDuration(interval: TimerInterval) {
    return Math.floor((interval.datetimeEnd! - interval.datetimeStart!) / 1000)
  }

  static getRunningTimeIntervalDuration(interval: TimerInterval) {
    return Math.floor((Date.now() - interval.datetimeStart!) / 1000)
  }
}
