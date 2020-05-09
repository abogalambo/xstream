import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  exitStream
} from '../../../state/actions/stream'
import {
  isPlaybackModeSelector,
  pageSelector,
} from '../../../state/selectors/current_stream'
import PlaybackStream from '../playback_stream'
import ComposeStream from '../compose_stream'
import ComposeBar from '../compose_bar'

const Stream = () => {
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const page = useSelector(pageSelector)
  const editable = page != 'view'

  const dispatch = useDispatch()

  useEffect(() => {
    return () => { dispatch(exitStream()) }
  }, [])

  return (
    <>
      { editable && (<ComposeBar />) }
      { isPlaybackMode ? (
        <PlaybackStream />
      ) : (
        <ComposeStream />
      )}
    </>
  )
}

export default Stream
