import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  startRecording as startRecordingAction,
  stopRecording as stopRecordingAction,
  playRecording as playRecordingAction,
  removeRecording as removeRecordingAction
} from '../../../state/actions/recorder'
import classnames from 'classnames'
import styles from './recorder.css'

const Recorder = () => {
  const { recording, recordingStartedAt, index } = useSelector(state => state.currentStream.currentSegment)
  const audioUrl = useSelector(state => (state.currentStream.segments[index].audio || {}).url)
  const initial = !recording && !recordingStartedAt
  const stopped = !recording && recordingStartedAt

  const dispatch = useDispatch();
  const startRecording = () => dispatch(startRecordingAction())
  const stopRecording = () => dispatch(stopRecordingAction())
  const playRecording = () => dispatch(playRecordingAction())
  const removeRecording = () => dispatch(removeRecordingAction())

  return (
    <div className={classnames(
      styles.recorder,
      {
        [styles.initial]: initial,
        [styles.recording]: recording,
        [styles.stopped]: stopped
      }
    )}>
      {initial && (
        <button onClick={startRecording} />
      )}

      {recording && (
        <button onClick={stopRecording} />
      )}

      {stopped && audioUrl && (
        <button onClick={playRecording} />
      )}

      {stopped && (
        <button onClick={removeRecording} />
      )}

    </div>
  )
}

export default Recorder

/*
notes:
only render it for the current segment
while recording you can't navigate to next / previous segment
At first let's try to save audio related data to the component state
don't forget cleanup on unmount
stop recording after 30 seconds
count down when recording

Play state:
- show that it is playing
- show elapsed time

props:

- all times
startRecording: func
stopRecording: func
deleteRecording: func
-----
playRecording: func

- initially:
recording: false
startTime: null
-----
playing: false

- Start recording:
recording: true
startTime: some value
-----
playing: false

- Stop recroding (or 30 seconds pass)
recording: false
startTime: some value
recordingUrl: true
-----
playing: false
*/
