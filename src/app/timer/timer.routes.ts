import { Routes } from '@angular/router';
import { TimerRootComponent } from './ui/timer-root.component';
import { TimerConfigComponent } from './ui/timer-config/timer-config.component';


export const TIMER_ROUTES: Routes = [
  {
    path: '',
    component: TimerRootComponent,
  },
  {
    path: 'config',
    component: TimerConfigComponent
  }
]
