import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import {
  faPen,
  faEye,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import {
  toggleMode as toggleModeAction,
  goToSegment as goToSegmentAction,
  addSegment
} from '../../../state/actions/stream'
import {
  showCoverSelector,
  currentSegmentDataSelector,
  isPlaybackModeSelector,
  canToggleModeSelector,
  indexSelector,
  pageSelector
} from '../../../state/selectors/current_stream'
import Cover from '../cover'
import Autosave from '../autosave'
import MediaCleaner from '../media_cleaner'
import OverviewPanel from '../overview_panel'
import Segment from '../segment'
import Navigation from '../navigation'
import ToggleButton from '../../lib/toggle_button'
import StreamProgress from '../stream_progress'
import styles from './stream.css'

const Stream = () => {
  const showCover = useSelector(showCoverSelector)
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const canToggleMode = useSelector(canToggleModeSelector)
  const segment = useSelector(currentSegmentDataSelector)
  const page = useSelector(pageSelector)
  
  const dispatch = useDispatch()
  const toggleMode = () => dispatch(toggleModeAction())
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

  const contents = [
    {
      value: 'compose',
      text:'',
      icon: <FontAwesomeIcon icon={faPen}/>,
    },
    {
      value: 'playback',
      text:'',
      icon: <FontAwesomeIcon icon={faEye}/>,
    }
  ]

  useEffect( () => {
    document.addEventListener('keydown', goToSegment)
    return () => document.removeEventListener('keydown', goToSegment)
  }, [])

  return (
    <div className={styles.stream}>
      <MediaCleaner />

      <div className={classnames(
        styles.overviewPanelContainer,
        { [styles.overviewPanelContainer_playback]: isPlaybackMode }
      )}>
        <OverviewPanel />
      </div>

      <div className={styles.mainSection}>
        <Autosave />

        {showCover && <Cover /> }

        {segment && (
          <>
            { isPlaybackMode && <StreamProgress /> }
            <div className={
              classnames( styles.segmentContainer, { [styles.segmentContainer_playback]: isPlaybackMode })}>
              <Segment
                index={index}
                key={`segment_${segment.timestamp}`}
                {...segment}
                isPlaybackMode={isPlaybackMode}
              />
            </div>
            <div className={styles.footerContainer}>
              <Navigation />
              {!isPlaybackMode && (
                <button
                  className={styles.addSegmentBtn}
                  onClick={onAddSegmentClick}>
                  <FontAwesomeIcon
                    className={styles.addSegmentBtn_icon}
                    icon={faPlus} />
                  Add Segment
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {(page != 'view') && (
        <div className={styles.toggleBtnContainer}>
          <ToggleButton
            contents={contents}
            onToggle={toggleMode}
            checkedValue={isPlaybackMode ? 'playback' : 'compose'}
            disabled={!canToggleMode}
          />
        </div>
      )}
    </div>
  )
}

export default Stream
