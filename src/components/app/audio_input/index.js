import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquare,
  faMicrophone
} from '@fortawesome/free-solid-svg-icons'
import {
  startRecording as startRecordingAction,
  stopRecording as stopRecordingAction
} from '../../../state/actions/recorder'
import styles from './audio_input.css'
import RecordingService from '../../../lib/recorder'
import CircleMeter from '../../lib/circle_meter'

const AudioInput = () => {
  const { recording, recordingStartedAt } = useSelector(state => state.currentStream.currentSegment)

  const dispatch = useDispatch();
  const [recorder] = useState(new RecordingService({
    onStart: () => dispatch(startRecordingAction()),
    onStop: () => dispatch(stopRecordingAction(recorder.audioUrl)),
    maxDuration: 30000
  }))

  const [ blah, setBlah ] = useState(true);
  const triggerRender = () => setBlah(!blah);

  useEffect(() => {
    const id = setInterval(triggerRender, 200);
    return () => clearInterval(id);
  });
  
  const percentage = recording ? 100 * elapsedTime(recordingStartedAt) / 30000 : 0
  const onClick = recording ? (()=>recorder.stopRecording()) : (()=>recorder.startRecording())
  const icon = recording ? faSquare : faMicrophone
  return (
    <button onClick={onClick} className={styles.playerMain}>
      <CircleMeter percentage={percentage} />
      <FontAwesomeIcon
        className={classnames(
          styles.playerMain_operator,
            {
              [styles.square]: recording,
              [styles.mic]: !recording
            }
          )}
        icon={icon} />
    </button>
  )
}

const elapsedTime = (startTime) => startTime ? (new Date().getTime() - startTime) : 0

export default AudioInput
