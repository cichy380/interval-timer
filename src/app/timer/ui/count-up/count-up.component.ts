import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormatTimePipe } from '../../../shared/format-time.pipe';


@Component({
  selector: 'app-count-up',
  standalone: true,
  templateUrl: './count-up.component.html',
  imports: [
    FormatTimePipe
  ],
  styleUrl: './count-up.component.css'
})
export class CountUpComponent implements OnInit, OnDestroy {
  value = 0;

  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit() {
    // TODO: shared interval service
    this.intervalId = setInterval(() => this.value++, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
