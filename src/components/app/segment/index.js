import React from 'react'
import { useSelector } from 'react-redux';
import {
  isPlaybackModeSelector
} from '../../../state/selectors/current_stream'
import PlaybackPlayer from '../playback_player'
import PlainSegment from './segment'

const Segment = () => {
  const isPlaybackMode = useSelector(isPlaybackModeSelector)

  return isPlaybackMode ? (
    <PlaybackPlayer>
      <PlainSegment />
    </PlaybackPlayer>
  ) : (
    <PlainSegment />
  )
}

export default Segment
