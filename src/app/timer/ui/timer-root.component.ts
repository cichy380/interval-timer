import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { lastValueFrom, Observable, take } from 'rxjs';
import { FormatTimePipe } from '../../shared/format-time.pipe'
import { TimerSoundService } from './timer-sound.service';
import { BreakService } from '../domain/break.service';
import { TimerService } from '../domain/timer.service';
import { TimerStatus } from '../api/timer-status'
import { TimeValue } from '../api/time-value';
import { TimerSound } from '../api/timer-sound';
import { BreakTime } from '../api/break-time';
import { Timer } from '../api/timer';
import { SoundService } from '../../shared/sound.service';


@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormatTimePipe, MatButtonModule, MatListModule, MatIconModule],
  providers: [
    SoundService,
    { provide: Timer, useClass: TimerService },
    { provide: BreakTime, useClass: BreakService },
    { provide: TimerSound, useClass: TimerSoundService },
  ],
  templateUrl: './timer-root.component.html',
  styleUrl: './timer-root.component.css',
})
export class TimerRootComponent implements OnInit, OnDestroy {

  public timerValues$!: Observable<TimeValue[]>
  public currentIntervalValue$!: Observable<TimeValue>
  public currentIntervalIndex$!: Observable<number>
  public summaryTime$!: Observable<TimeValue>
  public currentTimerStatus$!: Observable<TimerStatus>
  public currentBreakValue$!: Observable<TimeValue>

  public intervalCount!: number
  public breakLength!: number

  public TimerStatus = TimerStatus

  constructor(
    private readonly timer: Timer,
    private readonly breakTime: BreakTime,
    private readonly timerSound: TimerSound,
  ) {
  }

  ngOnInit() {
    this.intervalCount = 5 // TODO get this data from Storage
    this.breakLength = 60 // TODO get this data from Storage
    this.timer.initializeTimer(this.intervalCount)
    this.breakTime.initializeBreak(this.breakLength)

    this.timerValues$ = this.timer.selectAllValues()
    this.currentIntervalValue$ = this.timer.selectCurrentIntervalValue()
    this.currentIntervalIndex$ = this.timer.selectCurrentIntervalIndex()
    this.summaryTime$ = this.timer.selectSummaryTime()
    this.currentTimerStatus$ = this.timer.selectCurrentStatus()
    this.currentBreakValue$ = this.breakTime.selectValue()
  }

  async onStartTimerClick() {
    this.timer.startTimer()
    await this.timerSound.playBellDingSound()
  }

  async onNextIntervalClick() {
    this.timer.pauseTimer()
    this.breakTime.startBreak()
    await lastValueFrom(this.breakTime.selectBreakEnded().pipe(take(1)))
    await this.timerSound.playBellDingSound()
    this.timer.nextIteration()
  }

  onStopTimerClick() {
    this.timer.stopTimer()
  }

  onSkipBreakClick() {
    this.breakTime.stopBreak()
  }

  onPauseTimerClick() {
    this.timer.pauseTimer()
  }

  onContinueTimerClick() {
    this.timer.continueTimer()
  }

  ngOnDestroy() {
  }

}
