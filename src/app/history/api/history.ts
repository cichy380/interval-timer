import { HistoryWorkout } from './history-workout';


export abstract class History {

  abstract getAllWorkouts(): HistoryWorkout[]

  abstract saveWorkoutTime(intervalCount: number, summaryTime: number): void

  abstract clearAllWorkoutHistory(): void
}
