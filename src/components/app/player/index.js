import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquare,
  faPlay
} from '@fortawesome/free-solid-svg-icons'
import {
  startPlaying as startPlayingAction,
  stopPlaying as stopPlayingAction
} from '../../../state/actions/recorder'
import {
  segmentEnded as segmentEndedAction
} from '../../../state/actions/segment'
import styles from './player.css'
import PlayingService from '../../../lib/player'
import CircleMeter from '../../lib/circle_meter'

const Player = ({autoplay}) => {
  const { currentSegment, mode } = useSelector(state => state.currentStream)
  const { playing, index } = currentSegment
  const audioUrl = useSelector(state => (state.currentStream.segments[index].audio || {}).url)

  const dispatch = useDispatch();
  const [player, setPlayer] = useState(getPlayer(dispatch, audioUrl || ''))

  useEffect(() => {
    setPlayer(getPlayer(dispatch, audioUrl))
  }, [audioUrl]);

  useEffect(() => {
    if(autoplay && audioUrl) {
      player.startPlaying()
    }
  }, [audioUrl]);

  const onClick = audioUrl && (playing ? (()=>player.stopPlaying()) : (()=>player.startPlaying()))
  const icon = playing ? faSquare : faPlay
  return (
    <button
      onClick={onClick}
      className={classnames(
        styles.playerMain,
        {
          [styles.buttonDisabled]: !audioUrl
        }
      )}
    >
      <CircleMeter percentage={audioUrl ? player.percentage : 0} />
      <FontAwesomeIcon
        className={classnames(
          styles.playerMain_operator,
            {
              [styles.square]: playing,
              [styles.play]: !playing
            }
          )}
        icon={icon} />
      <audio src={audioUrl}></audio>
    </button>
  )
}

const getPlayer = (dispatch, audioUrl) => {
  if(!audioUrl) return

  return new PlayingService({
    onStart: () => dispatch(startPlayingAction()),
    onStop: () => dispatch(stopPlayingAction()),
    onEnded: () => dispatch(segmentEndedAction()),
  })
}

export default Player
