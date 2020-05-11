export const isSegmentEmpty = (segment) => {
  const { text, image, audio, script } = segment
  return !text && !image && !audio && !script
}

export const segmentHasVisual = (segment) => {
  const { text, image } = segment
  return text || image
}
