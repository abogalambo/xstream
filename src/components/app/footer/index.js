import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStepForward,
  faStepBackward,
  faMinusCircle
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
  segmentsSelector,
  canRecordSelector,
  isPlaybackModeSelector
} from '../../../state/selectors/current_stream'
import AudioInput from '../audio_input'
import Player from '../player'
import styles from './footer.css'

const Footer = () => {
  const canPrevious = useSelector(canPreviousSelector)
  const canNext = useSelector(canNextSelector)
  const index = useSelector(indexSelector)
  const segment = useSelector(currentSegmentDataSelector)
  const segments = useSelector(segmentsSelector)
  const canRecord = useSelector(canRecordSelector)
  const isPlaybackMode = useSelector(isPlaybackModeSelector)

  const dispatch = useDispatch();
  const onNextSegmentClick = () => dispatch(goToSegment(index + 1))
  const onPreviousSegmentClick = () => dispatch(goToSegment(index - 1))
  const onRemoveRecordingClick = () => dispatch(removeRecording())

  return (
    <div className={styles.footer}>
      <div className={styles.player}>
        <button onClick={onPreviousSegmentClick} disabled={!canPrevious}>
          <FontAwesomeIcon className={styles.playerMain_skip}
            size={'2x'}
            icon={faStepBackward}/>
        </button>

        {canRecord && !isPlaybackMode ? (
          <AudioInput key={`recorder_${segment.timestamp}`} />
        ) : (
          <div className={styles.playerContainer}>
            <Player key={`player_${segment.timestamp}`} />
            {!isPlaybackMode && (
              <div className={styles.removeButton} onClick={onRemoveRecordingClick}>
                <FontAwesomeIcon icon={faMinusCircle} />
              </div>
            )}
          </div>
        )}

        <button disabled={!canNext} onClick={onNextSegmentClick}>
          <FontAwesomeIcon className={styles.playerMain_skip}
            size={'2x'}
            icon={faStepForward}/>
        </button>
      </div>

      <div className={styles.index}>
        <span>
          {`${index + 1} / ${segments.length}`}
        </span>
      </div>
    </div>
  )
}

export default Footer
