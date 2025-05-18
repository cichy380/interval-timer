import { HistoryWorkoutAnemic } from '../anemic/history-workout-anemic';
import { HistoryWorkout } from '../../api/history-workout';


export class HistoryWorkoutConverter {
  static toHistoryTraining(anemic: HistoryWorkoutAnemic): any {
    return new HistoryWorkout(
      new Date(anemic.date),
      anemic.setCount,
      anemic.activeWorkoutTime,
    );
  }
}
