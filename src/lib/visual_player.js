class VisualPlayer {
  constructor({onStart, onStop, onEnd, duration}) {
    this.onStart = onStart
    this.onStop = onStop
    this.onEnd = onEnd
    this.duration = duration
    this.timeOffset = 0
    this.playingStartedAt = null
    this.timeoutID = null
  }

  startPlaying() {
    if(this.playingStartedAt) return
    const currentTime = new Date().getTime()
    this.playingStartedAt = currentTime - Math.min(this.timeOffset, this.duration)
    this.timeoutID = setTimeout(() => {
      this.stopPlaying()
    }, this.duration - this.timeOffset);
    this.onStart()
  }

  stopPlaying() {
    if(!this.playingStartedAt) return
    this.timeoutID && clearTimeout(this.timeoutID)
    const currentTime = new Date().getTime()
    this.timeOffset = Math.min(currentTime - this.playingStartedAt, this.duration)
    this.playingStartedAt = null
    this.onStop()
    if(this.timeOffset == this.duration) this.onEnd()
  }

  cleanup() {
    this.timeoutID && clearTimeout(this.timeoutID)
  }

  get status() {
    return {
      startedAt: this.playingStartedAt,
      isInProgress: !!this.playingStartedAt,
      offset: this.timeOffset,
      duration: this.duration
    }
  }
}

export default VisualPlayer
