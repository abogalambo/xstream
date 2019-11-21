import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  addSegment,
  removeSegment,
  goToSegment,
} from '../../../state/actions/stream'

import {
  segmentsSelector,
  isPlaybackModeSelector
} from '../../../state/selectors/current_stream'

import styles from './segments_overview.css'

const SegmentsOverview = () => {
  const segments = useSelector(segmentsSelector)
  const isPlaybackMode = useSelector(isPlaybackModeSelector)

  const dispatch = useDispatch();
  const onAddSegmentClick = () => dispatch(addSegment())

  return (
    <div className={styles.segmentsOverview}>
      {!isPlaybackMode && (
        <button
          onClick={onAddSegmentClick}
          className={styles.addSegmentButton}
        >
          <FontAwesomeIcon
            size={'2x'}
            icon={faPlus}
          />
        </button>
      )}
    </div>
  )
}

export default SegmentsOverview
