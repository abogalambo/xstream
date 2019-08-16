import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import {
  startRecording as startRecordingAction,
  stopRecording as stopRecordingAction,
  removeRecording as removeRecordingAction
} from '../../../state/actions/recorder'
import styles from './recorder.css'
import RecordingService from '../../../lib/recorder'

const Recorder = () => {
  const { recording, recordingStartedAt, index } = useSelector(state => state.currentStream.currentSegment)
  const audioUrl = useSelector(state => (state.currentStream.segments[index].audio || {}).url)
  const initial = !recording && !recordingStartedAt && !audioUrl
  const stopped = !recording && audioUrl
  const [recorder] = useState(new RecordingService())

  const dispatch = useDispatch();
  const startRecording = () => dispatch(startRecordingAction(recorder))
  const stopRecording = () => dispatch(stopRecordingAction(recorder))
  const removeRecording = () => dispatch(removeRecordingAction(recorder))

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
        <button onClick={startRecording}>Record Something!</button>
      )}

      {recording && (
        <button onClick={stopRecording}>Stop Recording!</button>
      )}

      {audioUrl && (
        <audio
          controls
          src={audioUrl}>
              Your browser does not support the
              <code>audio</code> element.
        </audio>
      )}

      {audioUrl && (
        <button onClick={removeRecording}>Remove Recording!</button>
      )}

    </div>
  )
}

export default Recorder
