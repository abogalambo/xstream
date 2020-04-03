import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPause,
  faPlay,
  faAngleLeft,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons'
import {
  segmentStarted,
  segmentPaused,
  segmentEnded,
  playStream,
  pauseStream
} from '../../../state/actions/playback'
import {
  goToSegment
} from '../../../state/actions/stream'
import {
  audioDataSelector,
  segmentDurationSelector,
  isStreamPlayingSelector,
  indexSelector
} from '../../../state/selectors/current_stream'
import AudioPlayer from '../../../lib/audio_player'
import VisualPlayer from '../../../lib/visual_player'
import styles from './playback_player.css'

const PlaybackPlayer = ({ children }) => {
  const isStreamPlaying = useSelector(isStreamPlayingSelector)
  const audioUrl = (useSelector(audioDataSelector) || {}).url
  const segmentDuration = useSelector(segmentDurationSelector)
  const index = useSelector(indexSelector)

  const isStreamPlayingRef = useRef(null)
  isStreamPlayingRef.current = isStreamPlaying

  const dispatch = useDispatch();

  const nextSegment = (e) => {
    e && e.stopPropagation()
    dispatch(goToSegment(index + 1))
  }

  const previousSegment = (e) => {
    e && e.stopPropagation()
    dispatch(goToSegment(index - 1))
  }

  const [player] = useState(getPlayer(dispatch, audioUrl, segmentDuration))
  const [isNew, setIsNew] = useState(true)

  const canHover = window.matchMedia('(hover: hover)').matches

  const togglePlaying = () => {
    setIsNew(false)
    if(isStreamPlayingRef.current) {
      dispatch(pauseStream())
    } else {
      dispatch(playStream())
    }
  }

  const clickHandler = (e) => {
    if(canHover) {
      togglePlaying()
      return
    }

    const clickX = e.clientX
    const { x, width } = e.target.getBoundingClientRect()
    const offset = clickX - x
    const isFirstQuarter = (offset / width) < 0.25
    const isLastQuarter = (offset / width) > 0.75

    if(isFirstQuarter) {
      previousSegment()
    }else if(isLastQuarter) {
      nextSegment()
    }else {
      togglePlaying()
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
      onClick={clickHandler}
    >
      { canHover && (
        <button
          onClick={previousSegment}
          className={classnames(styles.navBtn, styles.previousBtn)}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
      )}

      { canHover && (
        <button
          onClick={nextSegment}
          className={classnames(styles.navBtn, styles.nextBtn)}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      )}      

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
