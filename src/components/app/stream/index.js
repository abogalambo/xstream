import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import {
  goToSegment as goToSegmentAction,
  addSegment
} from '../../../state/actions/stream'
import {
  showCoverSelector,
  currentSegmentDataSelector,
  isPlaybackModeSelector,
  indexSelector,
  pageSelector,
  canAddSegmentSelector
} from '../../../state/selectors/current_stream'
import Cover from '../cover'
import Autosave from '../autosave'
import OverviewPanel from '../overview_panel'
import Segment from '../segment'
import Navigation from '../navigation'
import AspectRatioBox from '../aspect_ratio_box'
import ModeToggle from '../mode_toggle'
import StreamProgress from '../stream_progress'
import RemainingTime from '../remaining_time'
import styles from './stream.css'

const Stream = () => {
  const showCover = useSelector(showCoverSelector)
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const segment = useSelector(currentSegmentDataSelector)
  const page = useSelector(pageSelector)
  const canAddSegment = useSelector(canAddSegmentSelector)

  const dispatch = useDispatch()
  const onAddSegmentClick = () => dispatch(addSegment())

  const index = useSelector(indexSelector)
  const indexRef = useRef()
  indexRef.current = index
  const goToSegment = (e) => {
    if(e.keyCode === 39) {
      dispatch(goToSegmentAction(indexRef.current + 1))
    }else if(e.keyCode === 37) {
      dispatch(goToSegmentAction(indexRef.current - 1))
    }
  }

  useEffect( () => {
    document.addEventListener('keydown', goToSegment)
    return () => document.removeEventListener('keydown', goToSegment)
  }, [])

  return (
    <div className={styles.stream}>
      <OverviewPanel />

      <div className={styles.mainSection}>
        { segment && isPlaybackMode && <StreamProgress /> }

        { showCover && <Cover /> }

        {segment && (
          <>
            <div className={styles.topBar}>
              { !isPlaybackMode && (
                <div className={styles.remainingTimeContainer}>
                  <RemainingTime />
                </div>
              )}

              {(page != 'view') && (
                <div className={styles.toggleBtnContainer}>
                  <ModeToggle />
                </div>
              )}
            </div>
            
            <div className={styles.segmentContainer}>
              <AspectRatioBox>
                <Segment
                  index={index}
                  key={`segment_${segment.timestamp}`}
                  {...segment}
                  isPlaybackMode={isPlaybackMode}
                />
              </AspectRatioBox>
            </div>

            {!isPlaybackMode && (
              <div className={styles.footerContainer}>
                <Navigation />
                <button
                  className={classnames(
                    styles.addSegmentBtn,
                    {[styles.disabled]: !canAddSegment}
                  )}
                  disabled={!canAddSegment}
                  onClick={onAddSegmentClick}
                >
                  <FontAwesomeIcon
                    className={styles.addSegmentBtn_icon}
                    icon={faPlus} />
                  <span>Add Segment</span>
                </button>
              </div>
            )}
          </>
        )}

        <Autosave />
      </div>
    </div>
  )
}

export default Stream
