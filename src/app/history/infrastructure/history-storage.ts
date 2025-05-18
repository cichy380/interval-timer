import { Injectable } from '@angular/core';
import { History } from '../api/history';
import { HistoryWorkout } from '../api/history-workout';
import { HistoryWorkoutAnemic } from './anemic/history-workout-anemic';
import { HistoryWorkoutConverter } from './converter/history-workout-converter';
import { HistoryResource } from './history-resource';


@Injectable()
export class HistoryStorage implements History {
  constructor(
    private readonly historyResource: HistoryResource,
  ) {
  }

  getAllWorkouts(): HistoryWorkout[] {
    return this.historyResource.readHistory()
      .map(anemic => HistoryWorkoutConverter.toHistoryTraining(anemic));
  }

  saveWorkoutTime(setCount: number, activeWorkoutTime: number) {
    const todayDate = new Date().toISOString().split('T')[0];
    this.historyResource.upsertHistoryItem(new HistoryWorkoutAnemic(todayDate, setCount, activeWorkoutTime));
  }

  clearAllWorkoutHistory() {
    this.historyResource.deleteAllHistory();
  }
}
