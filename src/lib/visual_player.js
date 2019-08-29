class VisualPlayer {
  constructor({onStart, onStop, onEnd}) {
    this.onStart = onStart
    this.onStop = onStop
    this.onEnd = onEnd
    this.duration = 5000 // Later to be made dynamic
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

  get _elapsedTime() {
    if(this.playingStartedAt){
      return (new Date().getTime()) - this.playingStartedAt
    }else{
      return this.timeOffset
    }
  }

  get percentage() {
    return Math.ceil(100 * this._elapsedTime / this.duration)
  }
}

export default VisualPlayer
