import { Injectable } from '@angular/core';
import { SoundService } from '../../shared/sound.service';
import { BellSound } from '../api/bell-sound';


const BELL_DING_FILENAME = 'copper-bell-ding.ogg'


@Injectable()
export class BellSoundService implements BellSound {

  constructor(
    private readonly soundService: SoundService,
  ) {
    soundService.load([BELL_DING_FILENAME])
  }

  playBellDingSound() {
    return this.soundService.play(BELL_DING_FILENAME)
  }
}
