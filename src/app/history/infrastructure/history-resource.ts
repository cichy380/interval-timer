import { Injectable } from '@angular/core';
import { HistoryWorkoutAnemic } from './anemic/history-workout-anemic';


const HISTORY_STORAGE_KEY = 'interval-timer.history';


@Injectable()
export class HistoryResource {
  private storage = window.localStorage;

  upsertHistoryItem(item: HistoryWorkoutAnemic): void {
    this.deleteHistoryItemByDate(item.date);
    this.createHistoryItem(item);
  }

  readHistory(): HistoryWorkoutAnemic[] {
    const history = this.storage.getItem(HISTORY_STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  }

  deleteAllHistory(): void {
    this.storage.removeItem(HISTORY_STORAGE_KEY);
  }

  private createHistoryItem(item: HistoryWorkoutAnemic): void {
    const history = this.readHistory();
    history.push(item);
    this.storage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }

  private deleteHistoryItem(item: HistoryWorkoutAnemic): void {
    const history = this.readHistory();
    const updatedHistory = history.filter(
      (historyItem: HistoryWorkoutAnemic) => historyItem.date !== item.date
    );
    this.storage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  }

  private deleteHistoryItemByDate(date: string): void {
    const history = this.readHistory();
    const updatedHistory = history.filter(
      (historyItem: HistoryWorkoutAnemic) => historyItem.date !== date
    );
    this.storage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  }
}
