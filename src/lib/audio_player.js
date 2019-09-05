class AudioPlayer {
  constructor({onStart, onStop, onEnd}) {
    this.onStart = onStart
    this.onStop = onStop
    this.onEnd = onEnd
  }

  togglePlaying() {
    if(this._audioElement && !this._audio.paused){
      this.stopPlaying()
    }else{
      this.startPlaying()
    }
  }

  startPlaying() {
    this._audio.play()
  }

  stopPlaying() {
    this._audio.pause()
  }

  cleanup() {}

  get status() {
    if(!this._audioElement) {
      return {
        isInProgress: false,
        offset: 0,
        duration: 1
      }
    }

    if(this._audio.ended) {
      return {
        isInProgress: false,
        offset: 1,
        duration: 1
      }
    }

    return {
      startedAt: (new Date().getTime()) - (this._audio.currentTime * 1000),
      isInProgress: !this._audio.paused,
      offset: this._audio.currentTime * 1000,
      duration: this._audio.duration * 1000
    }
  }

  get _audio() {
    if(this._audioElement) return this._audioElement

    const audio = document.getElementsByTagName('audio')[0]
    
    audio.onplay = () => this.onStart()
    audio.onpause = () => this.onStop()
    audio.onended = () => this.onEnd()

    this._audioElement = audio

    return audio
  }
}

export default AudioPlayer
