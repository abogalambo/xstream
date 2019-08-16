class Recorder {
  constructor() {
    this.constraints = { audio: true }
    this._chunks = []
  }

  startRecording() {
    return this.mediaRecorderPromise.then((mediaRecorder) => {
      mediaRecorder.start()
    })
  }

  stopRecording() {
    return this.mediaRecorderPromise.then((mediaRecorder) => {
      mediaRecorder.stop()
    })
  }

  onStart(callback) {
    this.onStartCallback = callback
  }

  onStop(callback) {
    this.onStopCallback = callback
  }

  reset() {
    this._chunks = []
    this._audioURL = undefined
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
          this.onStartCallback && this.onStartCallback()
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(this._chunks, { 'type' : 'audio/ogg; codecs=opus' });
          this._audioURL = URL.createObjectURL(blob);
          this.onStopCallback && this.onStopCallback()
        }

        return Promise.resolve(mediaRecorder)
      })

    return this._mediaRecorderPromise
  }
}

export default Recorder