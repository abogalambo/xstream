import React, { useState, useEffect } from 'react'
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
  reorderSegments
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
  const [ isCollapsed, setisCollapsed] = useState(true)
  const [ draggedItem, setDraggedItem ] = useState()
  const [ skippedOverItem, setSkippedOverItem ] = useState()

  const segments = useSelector(segmentsSelector)
  const currentIndex = useSelector(indexSelector)
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const coverData = useSelector(coverDataSelector)
  const showCover = useSelector(showCoverSelector)

  const dispatch = useDispatch();
  const onAddSegmentClick = () => dispatch(addSegment())

  const onDragStart = (e) => {
    setDraggedItem(e.currentTarget)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData("text/html", e.currentTarget)
  }

  const onDragOver = (e) => {
     e.preventDefault()
     setSkippedOverItem(e.target)
  }

  const onDragEnd = () => {
    const skippedOverIndex = Number(skippedOverItem.dataset.id)
    const draggedIndex = Number(draggedItem.dataset.id)
    dispatch(reorderSegments(skippedOverIndex, draggedIndex))
    setDraggedItem(null)
    setSkippedOverItem(null)
  }

  const isDragging = (index) => {
    if(draggedItem) {
      return index == Number(draggedItem.dataset.id) ? true : false
    } else {
      return false
    }
  }

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
                  key={`overview_panel_${segment.timestamp}`}
                  dataId={index}
                  segment={segment}
                  isSelected={index == currentIndex}
                  onSegmentClick={() => dispatch(goToSegment(index))}
                  onRemoveSegmentClick={() => dispatch(removeSegment(index))}
                  isPlaybackMode={isPlaybackMode}
                  onDragOver={onDragOver}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  isDragging={isDragging(index)}
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
