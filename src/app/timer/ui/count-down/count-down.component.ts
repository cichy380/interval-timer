import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormatTimePipe } from '../../../shared/format-time.pipe';


@Component({
  selector: 'app-count-down',
  standalone: true,
  templateUrl: './count-down.component.html',
  imports: [
    FormatTimePipe
  ],
  styleUrl: './count-down.component.css'
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input({ required: true })
  duration!: number;

  @Output()
  end = new EventEmitter<void>();

  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit() {
    // TODO: shared interval service
    this.intervalId = setInterval(() => {
      this.duration--
      if (this.duration <= 0) {
        clearInterval(this.intervalId);
        this.end.emit();
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
