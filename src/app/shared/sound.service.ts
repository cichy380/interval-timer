import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class SoundService {

  load(audioFileNames: string[]) {
    audioFileNames.forEach(audioFileName => {
      const audio = new Audio(`assets/audio/${audioFileName}`)
      audio.load()
    })
  }

  play(audioFileName: string) {
    const audio = new Audio(`assets/audio/${audioFileName}`)
    return audio.play()
  }
}
