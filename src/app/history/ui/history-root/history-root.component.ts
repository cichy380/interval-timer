import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FloorPipe } from '../../../shared/floor.pipe';
import { FormatTimePipe } from '../../../shared/format-time.pipe';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { HISTORY_CORE_PROVIDERS } from '../../history.core.provider';
import { History } from '../../api/history';
import { HistoryWorkout } from '../../api/history-workout';


@Component({
  selector: 'app-history-root',
  standalone: true,
  imports: [CommonModule, FormatTimePipe, MatIconModule, FloorPipe, MatButtonModule],
  providers: [...HISTORY_CORE_PROVIDERS],
  templateUrl: './history-root.component.html',
  styleUrl: './history-root.component.css'
})
export class HistoryRootComponent implements OnInit {
  workoutsGroupedByWeek!: [number, HistoryWorkout[]][];

  private MAX_VISIBLE_WEEK_COUNT = 5; // TODO get this data from Storage

  private workouts!: HistoryWorkout[];
  private visibleWeekNumbers!: number[];

  readonly dialog = inject(MatDialog);

  constructor(
    private readonly history: History,
  ) {
  }

  ngOnInit() {
    this.prepareData();
  }

  onClearAllClick() {
    const dialogRef = this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
      data: { description: 'Are you sure you want to clear all workout history?' },
    });
    dialogRef.afterClosed().subscribe(clearAllHistoryAction => {
      if (clearAllHistoryAction) {
        this.history.clearAllWorkoutHistory();
        this.prepareData();
      }
    });
  }

  private prepareData() {
    this.workouts = this.history.getAllWorkouts();
    this.visibleWeekNumbers = this.getVisibleWeekNumbers();
    this.workoutsGroupedByWeek = this.getWorkoutsGroupedByWeek();
  }

  private getVisibleWeekNumbers() {
    if (this.workouts.length === 0) {
      return [];
    }

    const lastAvailableWeekNumber = this.getLastAvailableWeekNumber();
    return Array.from({ length: this.MAX_VISIBLE_WEEK_COUNT }, (_, i) => lastAvailableWeekNumber - i);
  }

  private getWorkoutsGroupedByWeek(): [number, HistoryWorkout[]][] {
    const weekMap = new Map<number, HistoryWorkout[]>();

    this.workouts.forEach(workout => {
      const weekNumber = this.getWeekNumber(workout.date);
      if (this.visibleWeekNumbers.includes(weekNumber)) {
        if (!weekMap.has(weekNumber)) {
          weekMap.set(weekNumber, []);
        }
        weekMap.get(weekNumber)!.push(workout);
      }
    });

    return Array.from(weekMap.entries()).sort((a, b) => b[0] - a[0]);
  }

  private getLastAvailableWeekNumber() {
    return this.getWeekNumber(this.workouts[this.workouts.length - 1].date);
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24);
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
}
