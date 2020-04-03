import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPause,
  faPlay
} from '@fortawesome/free-solid-svg-icons'
import {
  segmentStarted,
  segmentPaused,
  segmentEnded
} from '../../../state/actions/playback'
import {
  isSegmentStartedSelector,
  isTypingSelector,
  audioDataSelector,
  segmentDurationSelector
} from '../../../state/selectors/current_stream'
import styles from './compose_player.css'
import AudioPlayer from '../../../lib/audio_player'
import CircleMeter from '../../lib/circle_meter'

const ComposePlayer = () => {
  const isSegmentStarted = useSelector(isSegmentStartedSelector)
  const isTyping = useSelector(isTypingSelector)
  const audioUrl = (useSelector(audioDataSelector) || {}).url
  const segmentDuration = useSelector(segmentDurationSelector)

  const isTypingRef = useRef(null)
  isTypingRef.current = isTyping

  const dispatch = useDispatch();
  const [player] = useState(getPlayer(dispatch, audioUrl, segmentDuration))

  const togglePlaying = () => player.togglePlaying()
  const handleKeyDown = (e) => {
    if(e.keyCode === 32 && !isTypingRef.current){
      player.togglePlaying()
    }
  }

  useEffect(() => {
    return () => player.cleanup();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, []);

  return (
    <button
      onFocus={e => e.target.blur()}
      onClick={togglePlaying}
      className={styles.playerMain}
    >
      <div className={styles.circleShadow}>
        <CircleMeter { ...player.status } />
        <FontAwesomeIcon
          className={classnames(
            styles.playerMain_operator,
              {
                [styles.square]: isSegmentStarted,
                [styles.play]: !isSegmentStarted
              }
            )}
          icon={getIcon(isSegmentStarted)} />
        {audioUrl && (
          <audio src={audioUrl}></audio>
        )}
      </div>
    </button>
  )
}

const getPlayer = (dispatch, audioUrl, duration) => {
  return new AudioPlayer({
    onStart: () => dispatch(segmentStarted()),
    onStop: () => dispatch(segmentPaused()),
    onEnd: () => dispatch(segmentEnded()),
    duration
  })
}

const getIcon = (isSegmentStarted) => isSegmentStarted ? faPause : faPlay

export default ComposePlayer
