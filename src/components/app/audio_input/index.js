import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStop,
  faMicrophone
} from '@fortawesome/free-solid-svg-icons'
import {
  startRecording as startRecordingAction,
  stopRecording as stopRecordingAction
} from '../../../state/actions/recorder'
import {
  currentSegmentSelector,
  segmentAudioUploadKeySelectorFactory,
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
  const audioUploadKey = useSelector(segmentAudioUploadKeySelectorFactory(index))
  const remainingAudioTime = useSelector(remainingAudioTimeSelector)
  const currentIndex = useSelector(indexSelector)
  const isActive = index == currentIndex
  const isRecording = isActive && recording

  const canRecordAudio = useSelector(canRecordAudioSelector)
  const { maxDuration } = config.stream.audio
  const durationLimit = Math.min(maxDuration, remainingAudioTime)

  const dispatch = useDispatch();
  const recorderRef = useRef(null)

  useEffect(() => {
    if(!isActive && recorderRef.current) {
      recorderRef.current.stopRecording()
    }
  }, [isActive])

  const onClick = () => {
    if(isRecording) {
      recorderRef.current.stopRecording()
    } else {
      recorderRef.current = new RecordingService({
        onStart: () => dispatch(startRecordingAction(index)),
        onStop: () => dispatch(stopRecordingAction(
          recorderRef.current.audioUrl,
          audioUploadKey,
          recorderRef.current.blob,
          recorderRef.current.duration,
          index
        )),
        maxDuration: durationLimit
      })
      
      recorderRef.current.startRecording()
    }
  }

  const icon = isRecording ? faStop : faMicrophone
  return (
    <button
      onClick={onClick}
      className={styles.playerMain}
      disabled={!canRecordAudio}
    >
      
        {isRecording && (
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
                [styles.square]: isRecording,
                [styles.mic]: !isRecording
              }
            )
          }
          icon={icon}
        />
      
    </button>
  )
}

AudioInput.propTypes = {
  index: PropTypes.number.isRequired
}

export default AudioInput
