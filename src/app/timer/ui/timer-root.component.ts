import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { filter, Observable, switchMap } from 'rxjs';
import { HISTORY_CORE_PROVIDERS } from '../../history/history.core.provider';
import { History } from '../../history/api/history';
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
import { TimerIntervalUtils } from '../infrastructure/TimerIntervalUtils';


@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormatTimePipe, MatButtonModule, MatListModule, MatIconModule, CountDownComponent, TimerSummaryComponent, TimerAverageComponent, TimeIntervalCountUpComponent],
  providers: [
    ...HISTORY_CORE_PROVIDERS,
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

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly timer: Timer,
    private readonly timerSound: BellSound,
    private readonly history: History,
  ) {
  }

  ngOnInit() {
    this.timer.initializeTimer(this.intervalCount)

    this.timerIntervals$ = this.timer.selectIntervals()
    this.timerLastDoneInterval$ = this.timer.selectLastDoneInterval()
    this.timerRunningInterval$ = this.timer.selectRunningInterval()
    this.timerStatus$ = this.timer.selectTimerStatus()

    this.observeTimerEnding()
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
    return TimerIntervalUtils.getDoneTimeIntervalDuration(interval)
  }

  private observeTimerEnding() {
    this.timerStatus$
      .pipe(
        filter(timerStatus => timerStatus === TimerStatus.STOPPED),
        switchMap(() => this.timerIntervals$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(intervals => {
        this.history.saveWorkoutTime(
          this.intervalCount,
          TimerIntervalUtils.calculateWorkoutTime(intervals),
        )
      })
  }
}
