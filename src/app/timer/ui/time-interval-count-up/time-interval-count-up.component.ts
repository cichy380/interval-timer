import { Component, Input, OnInit } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { map, Observable } from 'rxjs'
import { SharedIntervalService } from '../../../shared/shared-interval.service'
import { FormatTimePipe } from '../../../shared/format-time.pipe'
import { TimerInterval } from '../../api/timer-interval'


@Component({
  selector: 'app-time-interval-count-up',
  standalone: true,
  imports: [
    AsyncPipe,
    FormatTimePipe,
  ],
  templateUrl: './time-interval-count-up.component.html',
  styleUrl: './time-interval-count-up.component.css',
})
export class TimeIntervalCountUpComponent implements OnInit {
  @Input({ required: true }) timeInterval!: TimerInterval

  value$!: Observable<number>

  constructor(private readonly sharedIntervalService: SharedIntervalService) {
  }

  ngOnInit() {
    this.value$ = this.sharedIntervalService.oneSecond$.pipe(map(_ => this.getRunningIntervalDuration(this.timeInterval)))
  }

  private getRunningIntervalDuration(interval: TimerInterval) {
    return Math.floor((Date.now() - interval.datetimeStart!) / 1000)
  }
}
