import React, { useState, useEffect } from 'react'
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

  const dispatch = useDispatch();
  const [recorder] = useState(new RecordingService({
    onStart: () => dispatch(startRecordingAction()),
    onStop: () => dispatch(stopRecordingAction(recorder.audioUrl)),
    onReset: () => dispatch(removeRecordingAction()),
    maxDuration: 30000
  }))

  const [ blah, setBlah ] = useState(true);
  const triggerRender = () => setBlah(!blah);
  useEffect(() => {
    const id = setInterval(triggerRender, 500);
    return () => clearInterval(id);
  });

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
        <button onClick={()=>recorder.startRecording()}>Record Something!</button>
      )}

      {recording && (
        <button onClick={()=>recorder.stopRecording()}>Stop Recording!</button>
      )}

      {recording && (
        <span>00:{ `${Math.ceil(remainingTime(recordingStartedAt, 30000) / 1000)}`.padStart(2, '0') }</span>
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
        <button onClick={()=>recorder.reset()}>Remove Recording!</button>
      )}

    </div>
  )
}

const elapsedTime = (startTime) => startTime ? (new Date().getTime() - startTime) : 0
const remainingTime = (startTime, timeLimit) => Math.max(timeLimit - elapsedTime(startTime), 0)

export default Recorder
