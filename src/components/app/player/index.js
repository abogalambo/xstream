import React, { useState, useEffect } from 'react'
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
  audioDataSelector,
  segmentDurationSelector,
  isPlaybackModeSelector
} from '../../../state/selectors/current_stream'
import styles from './player.css'
import AudioPlayer from '../../../lib/audio_player'
import VisualPlayer from '../../../lib/visual_player'
import CircleMeter from '../../lib/circle_meter'

const Player = () => {
  const isPlaying = useSelector(isPlayingSelector)
  const audioUrl = (useSelector(audioDataSelector) || {}).url
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const segmentDuration = useSelector(segmentDurationSelector)

  const dispatch = useDispatch();
  const [player] = useState(getPlayer(dispatch, audioUrl, segmentDuration))

  useEffect(() => {
    isPlaybackMode && player.startPlaying()
    return () => player.cleanup();
  }, []);

  return (
    <button
      onClick={() => (player.togglePlaying())}
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
