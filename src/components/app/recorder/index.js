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
  stopRecording as stopRecordingAction,
  removeRecording as removeRecordingAction
} from '../../../state/actions/recorder'
import styles from './recorder.css'
import RecordingService from '../../../lib/recorder'
import Player from '../player'
import CircleMeter from '../../lib/circle_meter'

const Recorder = () => {
  const { recording, recordingStartedAt, index } = useSelector(state => state.currentStream.currentSegment)
  const audioUrl = useSelector(state => (state.currentStream.segments[index].audio || {}).url)

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
    const id = setInterval(triggerRender, 200);
    return () => clearInterval(id);
  });

  if(audioUrl) {
    return (
      <div>
        <Player />
        <button onClick={()=>recorder.reset()}>Remove Recording!</button>
      </div>
    )
  } else {
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
}

const elapsedTime = (startTime) => startTime ? (new Date().getTime() - startTime) : 0

export default Recorder
