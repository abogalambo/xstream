export const isSegmentEmpty = (segment) => {
  const { text, image, audio, script } = segment
  return !text && !image && !audio && !script
}
