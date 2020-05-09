export const isSegmentEmpty = (segment) => {
  const { text, image, audio } = segment
  return !text && !image && !audio
}
