import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faEye
} from '@fortawesome/free-solid-svg-icons'
import {
  toggleMode as toggleModeAction
} from '../../../state/actions/stream'
import {
  showCoverSelector,
  currentSegmentDataSelector,
  isPlaybackModeSelector,
  canToggleModeSelector
} from '../../../state/selectors/current_stream'
import Cover from '../cover'
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

  return (
    <div className={styles.stream}>
      {showCover && (
        <Cover />
      )}

      {segment && (
        <Segment
          key={`segment_${segment.timestamp}`}
          {...segment}
          isPlaybackMode={isPlaybackMode}
        />
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

      {segment && (
        <Footer />
      )}
    </div>
  )
}

export default Stream
