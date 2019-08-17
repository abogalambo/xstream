class Recorder {
  constructor({onStart, onStop, onReset}) {
    this.constraints = { audio: true }
    this._chunks = []
    this.onStart = onStart
    this.onStop = onStop
    this.onReset = onReset
  }

  startRecording() {
    return this.mediaRecorderPromise.then((mediaRecorder) => {
      mediaRecorder.start()
    })
  }

  stopRecording() {
    clearTimeout(this._timeoutID)
    return this.mediaRecorderPromise.then((mediaRecorder) => {
      mediaRecorder.stop()
    })
  }

  reset() {
    this._chunks = []
    this._audioURL = undefined
    this.onReset && this.onReset()
  }

  _setTimer() {
    this._timeoutID = setTimeout(() => {
      this.stopRecording()
    }, 5000);
  }

  get audioUrl() {
    return this._audioURL
  }

  get userMediaPromise() {
    this._userMediaPromise = this._userMediaPromise || navigator.mediaDevices.getUserMedia(this.constraints)

    return this._userMediaPromise
  }

  get mediaRecorderPromise() {
    this._mediaRecorderPromise =
      this._mediaRecorderPromise ||
      this.userMediaPromise.then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => this._chunks.push(e.data);

        mediaRecorder.onstart = () => {
          this._setTimer()
          this.onStart && this.onStart()
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(this._chunks, { 'type' : 'audio/ogg; codecs=opus' });
          this._audioURL = URL.createObjectURL(blob);
          this.onStop && this.onStop()
        }

        return Promise.resolve(mediaRecorder)
      })

    return this._mediaRecorderPromise
  }
}

export default Recorder
