import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPause,
  faPlay
} from '@fortawesome/free-solid-svg-icons'
import {
  startPlaying as startPlayingAction,
  stopPlaying as stopPlayingAction
} from '../../../state/actions/recorder'
import {
  segmentEnded as segmentEndedAction
} from '../../../state/actions/stream'
import {
  isPlayingSelector,
  isTypingSelector,
  audioDataSelector,
  segmentDurationSelector,
  isPlaybackModeSelector,
  isStreamPlayingSelector
} from '../../../state/selectors/current_stream'
import styles from './player.css'
import AudioPlayer from '../../../lib/audio_player'
import VisualPlayer from '../../../lib/visual_player'
import CircleMeter from '../../lib/circle_meter'

const Player = () => {
  const isPlaying = useSelector(isPlayingSelector)
  const isStreamPlaying = useSelector(isStreamPlayingSelector)
  const isTyping = useSelector(isTypingSelector)
  const audioUrl = (useSelector(audioDataSelector) || {}).url
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
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
    isPlaybackMode && isStreamPlaying && player.startPlaying()
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
                [styles.square]: isPlaying,
                [styles.play]: !isPlaying
              }
            )}
          icon={getIcon(isPlaying)} />
        {audioUrl && (
          <audio src={audioUrl}></audio>
        )}
      </div>
    </button>
  )
}

const getPlayer = (dispatch, audioUrl, duration) => {
  const playerType = audioUrl ? AudioPlayer : VisualPlayer
  return new playerType({
    onStart: () => dispatch(startPlayingAction()),
    onStop: () => dispatch(stopPlayingAction()),
    onEnd: () => dispatch(segmentEndedAction()),
    duration
  })
}

const getIcon = (isPlaying) => isPlaying ? faPause : faPlay

export default Player
