import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import {
  faPen,
  faEye
} from '@fortawesome/free-solid-svg-icons'
import {
  toggleMode as toggleModeAction,
  goToSegment as goToSegmentAction
} from '../../../state/actions/stream'
import {
  showCoverSelector,
  currentSegmentDataSelector,
  isPlaybackModeSelector,
  canToggleModeSelector,
  indexSelector
} from '../../../state/selectors/current_stream'
import Cover from '../cover'
import Autosave from '../autosave'
import OverviewPanel from '../overview_panel'
import Segment from '../segment'
import Footer from '../footer'
import styles from './stream.css'

const Stream = () => {
  const showCover = useSelector(showCoverSelector)
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const canToggleMode = useSelector(canToggleModeSelector)
  const segment = useSelector(currentSegmentDataSelector)
  const dispatch = useDispatch()
  const toggleMode = () => dispatch(toggleModeAction())

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
      <Autosave />

      {showCover && (
        <Cover />
      )}

      {segment && (
        <>
          <div className={classnames(
            styles.overviewPanelContainer,
            { [styles.overviewPanelContainer_playback]: isPlaybackMode }
          )}>
            <OverviewPanel />
          </div>

          <div className={styles.mainSection}>
            <div className={classnames( styles.segmentContainer, { [styles.segmentContainer_playback]: isPlaybackMode })}>
              <Segment
                key={`segment_${segment.timestamp}`}
                {...segment}
                isPlaybackMode={isPlaybackMode}
              />
             </div>
              <Footer />
          </div>
        </>
      )}

      <button
        className={styles.modeSwitch}
        onClick={toggleMode}
        disabled={!canToggleMode}
      >
        <FontAwesomeIcon
          size={'2x'}
          icon={isPlaybackMode ? faPen : faEye}
        />
      </button>
    </div>
  )
}

export default Stream
