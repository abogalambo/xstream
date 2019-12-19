export const currentStreamSelector = (state) => state.currentStream

export const currentSegmentSelector = (state) => (currentStreamSelector(state) || {}).currentSegment

export const indexSelector = (state) => (currentSegmentSelector(state) || {}).index

export const segmentsSelector = (state) => (currentStreamSelector(state) || {}).segments

export const showCoverSelector = (state) => (indexSelector(state) === -1)

export const isRecordingSelector = (state) => currentSegmentSelector(state).recording

export const isPlayingSelector = (state) => currentSegmentSelector(state).playing

export const isTypingSelector = (state) => currentSegmentSelector(state).typing

export const isPlaybackModeSelector = (state) => (currentStreamSelector(state).mode == 'playback')

export const currentSegmentDataSelector = (state) => {
  const index = indexSelector(state)
  const segments = segmentsSelector(state)
  return segments[index]
}

export const coverDataSelector = (state) => (
  (({title, cover}) => ({title, cover}))(currentStreamSelector(state) || {})
)

export const canNavigateSelector = (state) => (
  !isRecordingSelector(state)
)

export const canToggleModeSelector = (state) => (
  !isRecordingSelector(state)
)

export const canPreviousSelector = (state) => (
  canNavigateSelector(state) &&
  indexSelector(state) > -1
)

export const canNextSelector = (state) => (
  canNavigateSelector(state) &&
  indexSelector(state) < (segmentsSelector(state).length - 1)
)

export const audioDataSelector = (state) => currentSegmentDataSelector(state).audio

export const canRecordSelector = (state) => !audioDataSelector(state)

export const segmentDurationSelector = (state) => {
  const segment = currentSegmentDataSelector(state)
  const { audio, text, image } = segment
  return (
    (audio && audio.duration) ||
    (text && timeForText(text, 1000)) ||
    (image && timeForText(image.caption, 0) + 2000) ||
    1000
  )
}

const mediaResourceForServer = (media) => {
  const { isPersisted, url, src, ...rest } = media
  return rest
}

export const autosaveParamsSelector = (state) => {
  const { id, title, cover, segments } = currentStreamSelector(state)
  const remoteCover = (cover && cover.isPersisted) ? mediaResourceForServer(cover) : null

  const remoteSegments = segments.map((segment) => {
    const {image, audio, ...rest} = segment
    const remoteSegment = rest

    if(image && image.isPersisted) {
      remoteSegment.image = mediaResourceForServer(image)
    }

    if(audio && audio.isPersisted) {
      remoteSegment.audio = mediaResourceForServer(audio)
    }

    return remoteSegment
  })

  return { id, title, cover: remoteCover, segments: remoteSegments }
}

const timeForText = (text = '', minimum) => {
  const millisecondsPerCharacter = 60
  return Math.max(millisecondsPerCharacter * text.length, minimum)
}

export const segmentImageUploadKeySelector = (state) => {
  const streamId = state.currentStream.id
  const segmentId = currentSegmentDataSelector(state).timestamp
  return `stream_${streamId}/segment_${segmentId}/image`
}

export const segmentAudioUploadKeySelector = (state) => {
  const streamId = state.currentStream.id
  const segmentId = currentSegmentDataSelector(state).timestamp
  return `stream_${streamId}/segment_${segmentId}/audio`
}

export const coverImageUploadKeySelector = (state) => {
  const streamId = state.currentStream.id
  return `stream_${streamId}/cover_image`
}
