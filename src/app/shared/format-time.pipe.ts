import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = (value - minutes * 60);

    const m = minutes < 10 ? `0${minutes}` : minutes;
    const s = seconds < 10 ? `0${seconds}` : seconds;

    return `${m}:${s}`;
  }
}
