import React, { useRef } from 'react'
import PropTypes from 'prop-types'
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
import {
  currentSegmentSelector,
  segmentAudioUploadKeySelector,
  remainingAudioTimeSelector,
  canRecordAudioSelector,
  indexSelector
} from '../../../state/selectors/current_stream'
import styles from './audio_input.css'
import RecordingService from '../../../lib/recorder'
import CircleMeter from '../../lib/circle_meter'
import config from '../../../../config'

const AudioInput = ({index}) => {
  const { recording, recordingStartedAt } = useSelector(currentSegmentSelector)
  const audioUploadKey = useSelector(segmentAudioUploadKeySelector)
  const remainingAudioTime = useSelector(remainingAudioTimeSelector)
  const currentIndex = useSelector(indexSelector)
  const isActive = index == currentIndex

  const canRecordAudio = useSelector(canRecordAudioSelector)
  const { maxDuration } = config.stream.audio
  const durationLimit = Math.min(maxDuration, remainingAudioTime)

  const dispatch = useDispatch();
  const recorderRef = useRef(null)

  const onClick = () => {
    if(recording) {
      recorderRef.current.stopRecording()
    } else {
      recorderRef.current = new RecordingService({
        onStart: () => dispatch(startRecordingAction(index)),
        onStop: () => dispatch(stopRecordingAction(
          recorderRef.current.audioUrl,
          audioUploadKey(index),
          recorderRef.current.blob,
          recorderRef.current.duration,
          index
        )),
        maxDuration: durationLimit
      })
      
      recorderRef.current.startRecording()
    }
  }

  const icon = recording && isActive ? faSquare : faMicrophone
  return (
    <button
      onClick={onClick}
      className={styles.playerMain}
      disabled={!canRecordAudio}
    >
      <div className={styles.circleShadow}>
        {isActive && (
          <CircleMeter
            startedAt={recordingStartedAt}
            isInProgress={recording}
            offset={0}
            duration={durationLimit}
            mode="compose"
          />
        )}
        <FontAwesomeIcon
          className={classnames(
            styles.playerMain_operator,
              {
                [styles.square]: isActive && recording,
                [styles.mic]: !isActive || !recording
              }
            )
          }
          icon={icon}
        />
      </div>
    </button>
  )
}

AudioInput.propTypes = {
  index: PropTypes.number.isRequired
}

export default AudioInput
