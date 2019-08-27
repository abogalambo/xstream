class Recorder {
  constructor({onStart, onStop, maxDuration}) {
    this.onStart = onStart
    this.onStop = onStop
    this.maxDuration = maxDuration + 500 // add a 500 milliseconds margin
    this._chunks = []
  }

  startRecording() {
    return this.mediaRecorderPromise.then((mediaRecorder) => {
      mediaRecorder.start()
    })
  }

  stopRecording() {
    clearTimeout(this._timeoutID)
    if(this._mediaRecorder){
      this._mediaRecorder.stop()
    }
  }

  reset() {
    this._chunks = []
    this._audioURL = null
  }

  _setTimer() {
    this._timeoutID = setTimeout(() => {
      this.stopRecording()
    }, this.maxDuration);
  }

  get audioUrl() {
    return this._audioURL
  }

  get userMediaPromise() {
    return navigator.mediaDevices.getUserMedia(Recorder.mediaConstraints)
  }

  get mediaRecorderPromise() {
    return this.userMediaPromise.then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => this._chunks.push(e.data);

      mediaRecorder.onstart = () => {
        this._setTimer()
        this.onStart && this.onStart()
      }

      mediaRecorder.onstop = () => {
        stream.getAudioTracks()[0].stop()
        const blob = new Blob(this._chunks, Recorder.blobOptions);
        this._audioURL = URL.createObjectURL(blob);
        this._mediaRecorder = null
        this.onStop && this.onStop()
      }

      this._mediaRecorder = mediaRecorder

      return Promise.resolve(mediaRecorder)
    })
  }
}

Recorder.mediaConstraints = { audio: true }
Recorder.blobOptions = { 'type' : 'audio/ogg; codecs=opus' }

export default Recorder
