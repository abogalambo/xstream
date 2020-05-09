import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import {
  goToSegment as goToSegmentAction,
} from '../../../state/actions/stream'
import {
  showCoverSelector,
  currentSegmentDataSelector,
  indexSelector,
  pageSelector
} from '../../../state/selectors/current_stream'
import Cover from '../cover'
import OverviewPanel from '../overview_panel'
import Segment from '../segment'
import AspectRatioBox from '../aspect_ratio_box'
import StreamProgress from '../stream_progress'
import styles from './playback_stream.css'

const PlaybackStream = () => {
  const showCover = useSelector(showCoverSelector)
  const segment = useSelector(currentSegmentDataSelector)
  const page = useSelector(pageSelector)
  const editable = page != 'view'

  const dispatch = useDispatch()

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

  useEffect(() => {
    document.addEventListener('keydown', goToSegment)
    return () => document.removeEventListener('keydown', goToSegment)
  }, [])

  return (
    <div className={classnames(styles.stream, {[styles.stream_editable]: editable})}>
      <OverviewPanel />

      <div className={styles.mainSection}>
        { segment && <StreamProgress /> }

        { showCover && <Cover /> }

        {segment && (
          <>
            <div className={styles.segmentContainer}>
              <AspectRatioBox>
                <Segment
                  index={index}
                  key={`segment_${segment.timestamp}`}
                  {...segment}
                  isPlaybackMode
                />
              </AspectRatioBox>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PlaybackStream
