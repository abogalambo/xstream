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
  isPlayingSelector,
  audioDataSelector
} from '../../../state/selectors/current_stream'
import styles from './player.css'
import AudioPlayer from '../../../lib/audio_player'
import CircleMeter from '../../lib/circle_meter'

const Player = () => {
  const isPlaying = useSelector(isPlayingSelector)
  const audioUrl = (useSelector(audioDataSelector) || {}).url

  const dispatch = useDispatch();
  const [player, setPlayer] = useState(getPlayer(dispatch, audioUrl || ''))

  useEffect(() => {
    setPlayer(audioUrl && getPlayer(dispatch, audioUrl || ''))
  }, []);

  const [ blah, setBlah ] = useState(true);
  const triggerRender = () => setBlah(!blah);

  useEffect(() => {
    const id = setInterval(triggerRender, 200);
    return () => clearInterval(id);
  });

  return (
    <button
      onClick={getOnClick(isPlaying, player)}
      className={styles.playerMain}
    >
      <CircleMeter percentage={player.percentage} />
      <FontAwesomeIcon
        className={classnames(
          styles.playerMain_operator,
            {
              [styles.square]: isPlaying,
              [styles.play]: !isPlaying
            }
          )}
        icon={getIcon(isPlaying)} />
      <audio src={audioUrl}></audio>
    </button>
  )
}

const getPlayer = (dispatch) => {
  return new AudioPlayer({
    onStart: () => dispatch(startPlayingAction()),
    onStop: () => dispatch(stopPlayingAction())
  })
}

const getOnClick = (isPlaying, player) => (
  isPlaying ? () => player.stopPlaying() : () => player.startPlaying()
)

const getIcon = (isPlaying) => isPlaying ? faPause : faPlay

export default Player
