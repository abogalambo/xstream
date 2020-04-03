import React, { useState, useEffect, useRef } from 'react'
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

const PlaybackPlayer = () => {
  const isStreamPlaying = useSelector(isStreamPlayingSelector)
  const audioUrl = (useSelector(audioDataSelector) || {}).url
  const segmentDuration = useSelector(segmentDurationSelector)

  const isStreamPlayingRef = useRef(null)
  isStreamPlayingRef.current = isStreamPlaying

  const dispatch = useDispatch();
  const [player] = useState(getPlayer(dispatch, audioUrl, segmentDuration))
  const [fresh, setFresh] = useState(true)

  const togglePlaying = () => {
    setFresh(false)
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
    <>
      {audioUrl && (
        <audio src={audioUrl}></audio>
      )}

      {!fresh && isStreamPlaying && (
        <div className={styles.playbackPlayer}>
          <FontAwesomeIcon icon={faPlay} />
        </div>
      )}

      {!fresh && !isStreamPlaying && (
        <div className={styles.playbackPlayer}>
          <FontAwesomeIcon icon={faPause} />
        </div>
      )}
    </>
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

export default PlaybackPlayer
