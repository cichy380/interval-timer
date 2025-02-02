import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { FormatTimePipe } from '../../shared/format-time.pipe'
import { BellSoundService } from '../domain/bell-sound.service';
import { TimerService } from '../domain/timer.service';
import { TimerStatus } from '../api/timer-status'
import { BellSound } from '../api/bell-sound';
import { Timer } from '../api/timer';
import { TimerInterval, TimerIntervalStatus } from '../api/timer-interval';
import { CountDownComponent } from './count-down/count-down.component';
import { TimerSummaryComponent } from './timer-summary/timer-summary.component';
import { TimerAverageComponent } from './timer-average/timer-average.component';
import { TimeIntervalCountUpComponent } from './time-interval-count-up/time-interval-count-up.component';


@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormatTimePipe, MatButtonModule, MatListModule, MatIconModule, CountDownComponent, TimerSummaryComponent, TimerAverageComponent, TimeIntervalCountUpComponent],
  providers: [
    { provide: Timer, useClass: TimerService },
    { provide: BellSound, useClass: BellSoundService },
  ],
  templateUrl: './timer-root.component.html',
  styleUrl: './timer-root.component.css',
})
export class TimerRootComponent implements OnInit {

  public timerIntervals$!: Observable<TimerInterval[]>
  public timerLastDoneInterval$!: Observable<TimerInterval | undefined>
  public timerRunningInterval$!: Observable<TimerInterval | undefined>
  public timerStatus$!: Observable<TimerStatus>

  public readonly intervalCount = 3 // TODO get this data from Storage
  public readonly breakLength = 60 // TODO get this data from Storage

  public TimerStatus = TimerStatus
  public TimerIntervalStatus = TimerIntervalStatus

  constructor(
    private readonly timer: Timer,
    private readonly timerSound: BellSound,
  ) {
  }

  ngOnInit() {
    this.timer.initializeTimer(this.intervalCount)

    this.timerIntervals$ = this.timer.selectIntervals()
    this.timerLastDoneInterval$ = this.timer.selectLastDoneInterval()
    this.timerRunningInterval$ = this.timer.selectRunningInterval()
    this.timerStatus$ = this.timer.selectTimerStatus()
  }

  async onStartTimerClick() {
    await this.timerSound.playBellDingSound()
    this.timer.startTimer()
  }

  async onStopIntervalClick() {
    await this.timerSound.playBellDingSound()
    this.timer.stopRunningInterval()
  }

  async onBreakEnd() {
    await this.timerSound.playBellDingSound()
    this.timer.startNextInterval()
  }

  async onSkipBreakClick() {
    await this.timerSound.playBellDingSound()
    this.timer.startNextInterval()
  }

  getIntervalDuration(interval: TimerInterval) {
    return Math.floor((interval.datetimeEnd! - interval.datetimeStart!) / 1000)
  }

}
