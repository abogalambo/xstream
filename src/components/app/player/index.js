import React from 'react'
import { useSelector } from 'react-redux';
import ComposePlayer from './compose_player'
import PlaybackPlayer from './playback_player'
import {
  isPlaybackModeSelector
} from '../../../state/selectors/current_stream'

const Player = () => {
  const isPlaybackMode = useSelector(isPlaybackModeSelector)

  return (
    isPlaybackMode ? (
      <PlaybackPlayer />
    ) : (
      <ComposePlayer />
    )
  )
}

export default Player
