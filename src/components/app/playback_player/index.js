import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPause,
  faPlay
} from '@fortawesome/free-solid-svg-icons'
import {
  segmentStarted,
  segmentPaused,
  segmentEnded,
  playStream,
  pauseStream
} from '../../../state/actions/playback'
import {
  audioDataSelector,
  segmentDurationSelector,
  isStreamPlayingSelector
} from '../../../state/selectors/current_stream'
import AudioPlayer from '../../../lib/audio_player'
import VisualPlayer from '../../../lib/visual_player'
import styles from './playback_player.css'

const PlaybackPlayer = ({ children }) => {
  const isStreamPlaying = useSelector(isStreamPlayingSelector)
  const audioUrl = (useSelector(audioDataSelector) || {}).url
  const segmentDuration = useSelector(segmentDurationSelector)

  const isStreamPlayingRef = useRef(null)
  isStreamPlayingRef.current = isStreamPlaying

  const dispatch = useDispatch();
  const [player] = useState(getPlayer(dispatch, audioUrl, segmentDuration))
  const [isNew, setIsNew] = useState(true)

  const togglePlaying = () => {
    setIsNew(false)
    if(isStreamPlayingRef.current) {
      dispatch(pauseStream())
    } else {
      dispatch(playStream())
    }
  }

  const handleKeyDown = (e) => {
    if(e.keyCode === 32){
      togglePlaying()
    }
  }

  useEffect(() => {
    isStreamPlaying && player.startPlaying()
    !isStreamPlaying && player.stopPlaying()
    return () => player.cleanup();
  }, [isStreamPlaying])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      className={styles.container}
      onClick={togglePlaying}
    >
      { children }

      {audioUrl && (
        <audio src={audioUrl}></audio>
      )}

      {!isNew && isStreamPlaying && (
        <div className={styles.playbackPlayer}>
          <FontAwesomeIcon icon={faPlay} />
        </div>
      )}

      {!isNew && !isStreamPlaying && (
        <div className={styles.playbackPlayer}>
          <FontAwesomeIcon icon={faPause} />
        </div>
      )}
    </div>
  )
}

const getPlayer = (dispatch, audioUrl, duration) => {
  const playerType = audioUrl ? AudioPlayer : VisualPlayer
  return new playerType({
    onStart: () => dispatch(segmentStarted()),
    onStop: () => dispatch(segmentPaused()),
    onEnd: () => dispatch(segmentEnded()),
    duration
  })
}

PlaybackPlayer.propTypes = {
  children: PropTypes.element
}

export default PlaybackPlayer
