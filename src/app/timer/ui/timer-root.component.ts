import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { FormatTimePipe } from '../../shared/format-time.pipe'
import { TimerStatus } from '../api/timer-status'
import { Timer } from '../api/timer';
import { TimerValue } from '../api/timer-value';
import { TimerService } from '../domain/timer.service';


@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormatTimePipe, MatButtonModule, MatListModule, MatIconModule],
  providers: [{ provide: Timer, useClass: TimerService }],
  templateUrl: './timer-root.component.html',
  styleUrl: './timer-root.component.css',
})
export class TimerRootComponent implements OnInit, OnDestroy {

  public timerValues$!: Observable<TimerValue[]>
  public currentIntervalValue$!: Observable<TimerValue>
  public currentIntervalIndex$!: Observable<number>
  public summaryTime$!: Observable<TimerValue>
  public currentTimerStatus$!: Observable<TimerStatus>

  public intervalCount!: number

  public TimerStatus = TimerStatus

  constructor(
    private readonly timer: Timer,
  ) {
  }

  ngOnInit() {
    this.intervalCount = 5 // TODO get this data from Storage
    this.timer.initializeTimer(this.intervalCount)
    this.timerValues$ = this.timer.selectAllValues()
    this.currentIntervalValue$ = this.timer.selectCurrentIntervalValue()
    this.currentIntervalIndex$ = this.timer.selectCurrentIntervalIndex()
    this.summaryTime$ = this.timer.selectSummaryTime()
    this.currentTimerStatus$ = this.timer.selectCurrentStatus()
  }

  onStartTimerClick() {
    this.timer.startTimer()
  }

  onNextIntervalClick() {
    this.timer.nextIteration()
  }

  onStopTimerClick() {
    this.timer.stopTimer()
  }

  ngOnDestroy() {
  }

}
