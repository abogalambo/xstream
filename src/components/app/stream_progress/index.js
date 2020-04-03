import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ProgressBar from '../../lib/progress_bar'
import {
  streamProgressSelector
} from '../../../state/selectors/current_stream'

const StreamProgress = () => {
  const streamProgressData = useSelector(streamProgressSelector)

  const [, setBlah ] = useState(null)
  const triggerRender = () => setBlah(new Date().getTime())

  useEffect(() => {
    const id = setInterval(triggerRender, 100)
    return () => clearInterval(id)
  }, [])

  return (
    <ProgressBar percent={streamProgress(streamProgressData)} />
  )
}

const streamProgress = ({
  index,
  streamDuration,
  currentDuration,
  isStarted,
  startedAt,
  startOffset
}) => {
  if(index == -1) {
    return 0
  }

  const segmentOffset = isStarted ? ((new Date().getTime()) - startedAt) : startOffset
  return 100 * (currentDuration + segmentOffset) / streamDuration
}

export default StreamProgress
