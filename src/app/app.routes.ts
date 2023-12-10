import { Routes } from '@angular/router'


export const APP_ROUTES: Routes = [
  {
    path: 'timer',
    loadChildren: () => import('./timer').then(m => m.TIMER_ROUTES),
  },
  {
    path: 'history',
    loadComponent: () => import('./history').then(m => m.HistoryRootComponent),
  },
  {
    path: '',
    redirectTo: '/timer',
    pathMatch: 'full'
  },
]
