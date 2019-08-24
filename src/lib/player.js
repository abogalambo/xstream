class Player {
  constructor({onStart, onStop, onEnded}) {
    this.onStart = onStart
    this.onStop = onStop
    this.onEnded = onEnded
  }

  startPlaying() {
    this._audio.play()
  }

  stopPlaying() {
    this._audio.pause()
  }

  get percentage() {
    if(!this._audioElement) return 0
    if(this._audio.ended) return 100

    return Math.ceil(100 * this._audio.currentTime / Math.min(30000, this._audio.duration))
  }

  get _audio() {
    if(this._audioElement) return this._audioElement

    const audio = document.getElementsByTagName('audio')[0]
    
    audio.onplay = () => this.onStart()
    audio.onpause = () => this.onStop()
    audio.onended = () => this.onEnded()

    this._audioElement = audio

    return audio
  }
}

export default Player
