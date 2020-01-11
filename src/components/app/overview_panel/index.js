import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons'
import {
  addSegment,
  removeSegment,
  goToSegment,
} from '../../../state/actions/stream'

import {
  segmentsSelector,
  indexSelector,
  isPlaybackModeSelector,
  coverDataSelector,
  showCoverSelector
} from '../../../state/selectors/current_stream'

import SegmentOverview from '../segment_overview'
import CoverOverview from '../cover_overview'
import classnames from 'classnames'
import styles from './overview_panel.css'

const OverviewPanel = () => {
  const [ isCollapsed, setisCollapsed] = useState(false)

  const segments = useSelector(segmentsSelector)
  const currentIndex = useSelector(indexSelector)
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const coverData = useSelector(coverDataSelector)
  const showCover = useSelector(showCoverSelector)

  const dispatch = useDispatch();
  const onAddSegmentClick = () => dispatch(addSegment())

  return (
    <div className={classnames(
      styles.overviewPanelContainer,
      { [styles.overviewPanelContainer_collapsed]: isCollapsed}
    )}>
      <div className={styles.overviewPanel}>
          <div className={styles.overviewPanel_wrapper}>
            <div className={styles.overviewPanel_segements}>
              <CoverOverview
                coverData={coverData}
                isSelected={showCover}
                onCoverClick={() => dispatch(goToSegment(-1))}
              />
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

            {!isPlaybackMode && (<button
              onClick={onAddSegmentClick}
              className={styles.overviewPanel_addBtn}
            >
              <FontAwesomeIcon className={styles.overviewPanel_addBtnIcon}
                icon={faPlus}
              />
            </button>)}
          </div>
      </div>
      <button
        className={styles.overviewPanel_collapseBtn}
        onClick={() => setisCollapsed(!isCollapsed)}
      >
        <FontAwesomeIcon
          className={classnames(
            styles.collapseIcon,
            { [styles.collapseIcon_collapsed] : isCollapsed }
          )}
          icon={faChevronLeft} />
      </button>
    </div>
  )
}

export default OverviewPanel
