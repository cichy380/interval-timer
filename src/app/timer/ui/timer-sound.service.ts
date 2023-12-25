import { Injectable } from '@angular/core';
import { SoundService } from '../../shared/sound.service';
import { TimerSound } from '../api/timer-sound';


const BELL_DING_FILENAME = 'copper-bell-ding.ogg'


@Injectable()
export class TimerSoundService implements TimerSound {

  constructor(
    private readonly soundService: SoundService,
  ) {
    soundService.load([BELL_DING_FILENAME])
  }

  playBellDingSound() {
    return this.soundService.play(BELL_DING_FILENAME)
  }
}
