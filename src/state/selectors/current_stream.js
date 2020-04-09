import {
  streamDuration,
  segmentDuration,
  remainingTime,
  canAddContent,
  remainingTimeWithoutIndex,
  remainingCharCountWithoutIndex
} from '../../lib/stream_duration'

import {
  canEditStream
} from '../../lib/stream_permissions'

import {
  currentUserIdSelector
} from './current_user'

export const currentStreamSelector = (state) => state.currentStream

export const currentSegmentSelector = (state) => (currentStreamSelector(state) || {}).currentSegment

export const indexSelector = (state) => (currentSegmentSelector(state) || {}).index

export const segmentsSelector = (state) => (currentStreamSelector(state) || {}).segments

export const showCoverSelector = (state) => (indexSelector(state) === -1)

export const isRecordingSelector = (state) => currentSegmentSelector(state).recording

export const isSegmentStartedSelector = (state) => currentSegmentSelector(state).isStarted

export const isStreamPlayingSelector = (state) => currentStreamSelector(state).isStreamPlaying

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

export const pageSelector = (state) => currentStreamSelector(state).page

export const canToggleModeSelector = (state) => (
  !isRecordingSelector(state) && pageSelector(state) != 'view'
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

export const segmentDurationSelector = (state) => segmentDuration(currentSegmentDataSelector(state))

const mediaResourceForServer = (media) => {
  const { isPersisted, url, src, ...rest } = media
  return rest
}

export const autosaveParamsSelector = (state) => {
  const { id, authorId, title, cover, segments } = currentStreamSelector(state)
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

  return { id, authorId, title, cover: remoteCover, segments: remoteSegments }
}

export const segmentImageUploadKeySelector = (state) => {
  const userId = currentUserIdSelector(state)
  const streamId = state.currentStream.id
  const segmentId = currentSegmentDataSelector(state).timestamp
  return `user_${userId}/stream_${streamId}/segment_${segmentId}/image`
}

export const segmentAudioUploadKeySelector = (state) => {
  const userId = currentUserIdSelector(state)
  const streamId = state.currentStream.id
  const segmentId = currentSegmentDataSelector(state).timestamp
  return `user_${userId}/stream_${streamId}/segment_${segmentId}/audio`
}

export const coverImageUploadKeySelector = (state) => {
  const userId = currentUserIdSelector(state)
  const streamId = state.currentStream.id
  return `user_${userId}/stream_${streamId}/cover_image`
}

export const streamProgressSelector = (state) => {
  const index = indexSelector(state)
  const segments = segmentsSelector(state)

  const { startedAt, startOffset } = currentSegmentSelector(state)

  return {
    index,
    startOffset,
    startedAt,
    isStarted: isSegmentStartedSelector(state),
    streamDuration: streamDuration(segments),
    currentDuration: streamDuration(segments, index)
  }
}

export const remainingTimeSelector = (state) => remainingTime(segmentsSelector(state))

export const remainingAudioTimeSelector = (state) => {
  const index = indexSelector(state)
  const segments = segmentsSelector(state)
  return remainingTimeWithoutIndex(segments, index)
}

export const remainingCharCountSelector = (state) => {
  const index = indexSelector(state)
  const segments = segmentsSelector(state)
  return remainingCharCountWithoutIndex(segments, index)
}

export const canAddImageSelector = (state) => {
  const index = indexSelector(state)
  const segments = segmentsSelector(state)
  return canAddContent(segments, index, {image: {caption: ''}})
}

export const canAddSegmentSelector = (state) => canAddContent(segmentsSelector(state))

export const canRecordAudioSelector = (state) => {
  const index = indexSelector(state)
  const segments = segmentsSelector(state)
  return canAddContent(segments, index, {audio: {duration: 1000}})
}

export const canEditCurrentStreamSelector = (state) => {
  const stream = currentStreamSelector(state)
  const currentUserId = currentUserIdSelector(state)

  return (stream && currentUserId) ? canEditStream(stream, currentUserId) : false
}

export const streamAuthorSelector = (state) => currentStreamSelector(state).author
