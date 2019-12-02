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
  indexSelector,
  isPlaybackModeSelector
} from '../../../state/selectors/current_stream'

import SegmentOverview from '../segment_overview'
import styles from './overview_panel.css'

const OverviewPanel = () => {
  const segments = useSelector(segmentsSelector)
  const currentIndex = useSelector(indexSelector)
  const isPlaybackMode = useSelector(isPlaybackModeSelector)

  const dispatch = useDispatch();
  const onAddSegmentClick = () => dispatch(addSegment())

  return (
    <div className={styles.overviewPanel}>
      {!isPlaybackMode && (
        <div className={styles.overviewPanel_wrapper}>
          <div className={styles.overviewPanel_segements}>
            {segments.map((segment, index) => (
              <SegmentOverview
                key={`overview_panel_${segment.timestamp}`}
                segment={segment}
                isSelected={index == currentIndex}
                onSegmentClick={() => dispatch(goToSegment(index))}
                onRemoveSegmentClick={() => dispatch(removeSegment(index))}
              />
            ))}
          </div>

          <div className={styles.overviewPanel_divider}></div>

          <button
            onClick={onAddSegmentClick}
            className={styles.overviewPanel_addButton}
          >
            <FontAwesomeIcon
              icon={faPlus}
            />
          </button>
        </div>
      )}
    </div>
  )
}

export default OverviewPanel
