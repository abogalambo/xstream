export const currentStreamSelector = (state) => state.currentStream

export const currentSegmentSelector = (state) => (currentStreamSelector(state) || {}).currentSegment

export const indexSelector = (state) => (currentSegmentSelector(state) || {}).index

export const segmentsSelector = (state) => (currentStreamSelector(state) || {}).segments

export const showCoverSelector = (state) => (indexSelector(state) === -1)

export const isRecordingSelector = (state) => currentSegmentSelector(state).recording

export const isPlayingSelector = (state) => currentSegmentSelector(state).playing

export const currentSegmentDataSelector = (state) => {
  const index = indexSelector(state)
  const segments = segmentsSelector(state)
  return segments[index]
}

export const coverDataSelector = (state) => ({
  title: (currentStreamSelector(state) || {}).title
})
