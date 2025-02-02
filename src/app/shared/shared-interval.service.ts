import { Injectable } from '@angular/core'
import { interval, map, share } from 'rxjs'


@Injectable({
  providedIn: 'root',
})
export class SharedIntervalService {

  oneSecond$ = interval(1000).pipe(
    map(_ => void 0),
    share(),
  )

}
