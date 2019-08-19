import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import {
  startPlaying as startPlayingAction,
  stopPlaying as stopPlayingAction
} from '../../../state/actions/recorder'
import styles from './player.css'
import PlayingService from '../../../lib/player'
import CircleMeter from '../../lib/circle_meter'

const Player = () => {
  const { playing, index } = useSelector(state => state.currentStream.currentSegment)
  const audioUrl = useSelector(state => (state.currentStream.segments[index].audio || {}).url)

  const dispatch = useDispatch();
  const [player, setPlayer] = useState(getPlayer(dispatch, audioUrl || ''))

  useEffect(() => {
    setPlayer(getPlayer(dispatch, audioUrl || ''))
  }, [audioUrl]);

  return (
    <div className={classnames(styles.player)}>
      {!playing && (
        <button onClick={()=>player.startPlaying()}>Play</button>
      )}

      {playing && (
        <button onClick={()=>player.stopPlaying()}>Stop</button>
      )}

      <audio src={audioUrl}></audio>

      <CircleMeter percentage={ player.percentage } />
    </div>
  )
}

const getPlayer = (dispatch) => {
  return new PlayingService({
    onStart: () => dispatch(startPlayingAction()),
    onStop: () => dispatch(stopPlayingAction())
  })
}

export default Player
