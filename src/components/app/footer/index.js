import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepForward, faStepBackward, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import {
  addSegment,
  removeSegment,
  goToSegment,
} from '../../../state/actions/stream'
import {
  canPreviousSelector,
  canNextSelector,
  indexSelector,
  currentSegmentDataSelector,
  canEditStreamSelector,
  segmentsSelector
} from '../../../state/selectors/current_stream'
import AudioInput from '../audio_input'
import styles from './footer.css'

const Footer = () => {
  const canPrevious = useSelector(canPreviousSelector)
  const canNext = useSelector(canNextSelector)
  const index = useSelector(indexSelector)
  const segment = useSelector(currentSegmentDataSelector)
  const canEditStream = useSelector(canEditStreamSelector)
  const segments = useSelector(segmentsSelector)

  const dispatch = useDispatch();
  const onAddSegmentClick = () => dispatch(addSegment())
  const onRemoveSegmentClick = () => dispatch(removeSegment())
  const onNextSegmentClick = () => dispatch(goToSegment(index + 1))
  const onPreviousSegmentClick = () => dispatch(goToSegment(index - 1))

  return (
    <div className={styles.footer}>
      <div className={styles.player}>
        <button onClick={onPreviousSegmentClick} disabled={!canPrevious}>
          <FontAwesomeIcon className={styles.playerMain_skip}
            size={'2x'}
            icon={faStepBackward}/>
        </button>

        <AudioInput key={`recorder_${segment.timestamp}`} />

        <button disabled={!canNext} onClick={onNextSegmentClick}>
          <FontAwesomeIcon className={styles.playerMain_skip}
            size={'2x'}
            icon={faStepForward}/>
        </button>
      </div>

      <div className={styles.index}>
        <button onClick={onRemoveSegmentClick} disabled={!canEditStream}>
          <FontAwesomeIcon size={'2x'} icon={faMinusCircle} />
        </button>

        <span>
          {`${index + 1} / ${segments.length}`}
        </span>

        <button onClick={onAddSegmentClick} disabled={!canEditStream}>
          <FontAwesomeIcon size={'2x'} icon={faPlusCircle} />
        </button>
      </div>
    </div>
  )
}

export default Footer
