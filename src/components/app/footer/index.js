import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepForward, faStepBackward, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import {
  addSegment,
  removeSegment,
  goToSegment,
} from '../../../state/actions/stream'
import Recorder from '../recorder'
import styles from './footer.css'

const Footer = () => {
  const currentStream = useSelector(state => state.currentStream);
  const { segments, currentSegment } = currentStream
  const { index } = currentSegment

  const dispatch = useDispatch();
  const onAddSegmentClick = () => dispatch(addSegment())
  const onRemoveSegmentClick = () => dispatch(removeSegment())
  const onNextSegmentClick = () => dispatch(goToSegment(index + 1))
  const onPreviousSegmentClick = () => dispatch(goToSegment(index - 1))

  const segment = segments[index]

  return (
    <div className={styles.footer}>
      <div className={styles.player}>
        <button onClick={onPreviousSegmentClick}>
          <FontAwesomeIcon className={styles.playerMain_skip}
            size={'2x'}
            icon={faStepBackward}/>
        </button>

        { segment && (
          <Recorder key={`recorder_${segment.timestamp}`} />
        )}
        
        <button onClick={onNextSegmentClick}>
          <FontAwesomeIcon className={styles.playerMain_skip}
            size={'2x'}
            icon={faStepForward}/>
        </button>

        <button onClick={onRemoveSegmentClick}>
          <FontAwesomeIcon className={styles.playerMain_skip}
            size={'2x'}
            icon={faMinus}/>
        </button>

        <button onClick={onAddSegmentClick}>
          <FontAwesomeIcon className={styles.playerMain_skip}
            size={'2x'}
            icon={faPlus}/>
        </button>
      </div>
      <div className={styles.index}>
        <span>
          { currentSegment.index > -1 && (
            `${currentSegment.index + 1} / ${segments.length}`
          )}
        </span>
      </div>
    </div>
  )
}

export default Footer
