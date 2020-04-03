import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStepForward,
  faStepBackward,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import {
  goToSegment,
} from '../../../state/actions/stream'
import {
  removeRecording
} from '../../../state/actions/recorder'
import {
  canPreviousSelector,
  canNextSelector,
  indexSelector,
  currentSegmentDataSelector,
  audioDataSelector
} from '../../../state/selectors/current_stream'
import AudioInput from '../audio_input'
import ComposePlayer from '../compose_player'
import classnames from 'classnames'
import styles from './navigation.css'

const Navigation = () => {
  const canPrevious = useSelector(canPreviousSelector)
  const canNext = useSelector(canNextSelector)
  const index = useSelector(indexSelector)
  const segment = useSelector(currentSegmentDataSelector)
  const audioData = useSelector(audioDataSelector)

  const dispatch = useDispatch();
  const onNextSegmentClick = () => dispatch(goToSegment(index + 1))
  const onPreviousSegmentClick = () => dispatch(goToSegment(index - 1))
  const onRemoveRecordingClick = () => {
    setHadRecording(true)
    dispatch(removeRecording())
  }

  const [ hadRecording, setHadRecording ] = useState(false)

  return (
    <>
      <div className={styles.streamNav}>
        <button onClick={onPreviousSegmentClick} disabled={!canPrevious}>
          <FontAwesomeIcon className={styles.skipIcon}
            size={'2x'}
            icon={faStepBackward}/>
        </button>

        <div className={classnames(
          styles.playerContainer,
          {
            [styles.playerContainer_entrance]: audioData,
            [styles.playerContainer_departure]: !audioData && hadRecording
          }
        )}>
          {audioData ? (
            <>
              <ComposePlayer key={`player_${segment.timestamp}`} />
              <button className={styles.removeButton} onClick={onRemoveRecordingClick}>
                <FontAwesomeIcon className={styles.removeButton_icon}
                  icon={faTrash} />
              </button>
            </>
          ) : (
            <AudioInput key={`recorder_${segment.timestamp}`} />
          )}
        </div>

        <button disabled={!canNext} onClick={onNextSegmentClick}>
          <FontAwesomeIcon className={styles.skipIcon}
            size={'2x'}
            icon={faStepForward}/>
        </button>
      </div>
    </>
  )
}

export default Navigation
