import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
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
  showCoverSelector,
  canAddSegmentSelector
} from '../../../state/selectors/current_stream'
import CoverOverview from '../cover_overview'
import SegmentOverview from './segment_overview'
import styles from './overview_panel.css'

const PlainOverviewPanel = () => {
  const [ isCollapsed, setisCollapsed ] = useState(true)

  const segments = useSelector(segmentsSelector)
  const currentIndex = useSelector(indexSelector)
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const coverData = useSelector(coverDataSelector)
  const showCover = useSelector(showCoverSelector)
  const canAddSegment = useSelector(canAddSegmentSelector)

  const dispatch = useDispatch();
  const onAddSegmentClick = () => dispatch(addSegment())

  useEffect(() => {
    if(isPlaybackMode) {
      setisCollapsed(true)
    } else {
      setisCollapsed(false)
    }
  }, [isPlaybackMode])

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
                  index={index}
                  key={`overview_panel_${segment.timestamp}`}
                  segment={segment}
                  isSelected={index == currentIndex}
                  onSegmentClick={() => dispatch(goToSegment(index))}
                  onRemoveSegmentClick={() => dispatch(removeSegment(index))}
                  isPlaybackMode={isPlaybackMode}
                />
              ))}
            </div>

            <div className={styles.overviewPanel_divider}></div>

            {!isPlaybackMode && canAddSegment && (
              <button
                onClick={onAddSegmentClick}
                className={styles.overviewPanel_addBtn}
              >
                <FontAwesomeIcon className={styles.overviewPanel_addBtnIcon}
                  icon={faPlus}
                />
              </button>
            )}
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

export default PlainOverviewPanel
