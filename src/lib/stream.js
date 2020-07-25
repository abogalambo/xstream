export const isSegmentEmpty = (segment) => {
  const { text, image, audio, script } = segment
  return !text && !image && !audio && !script
}

export const segmentHasVisual = (segment) => {
  const { text, image } = segment
  return text || image
}

export const newIndex = (currentIndex, targetIndex, segments, isPlaybackMode) =>  {
  if(targetIndex >= segments.length || targetIndex < -1) return currentIndex
  if(targetIndex == -1) return targetIndex

  if(isPlaybackMode) {
    if(currentIndex < targetIndex) {
      for(let i = targetIndex; i < segments.length; i++) {
        if(!isSegmentEmpty(segments[i])) return i
      }
      return currentIndex
    }

    if(currentIndex >= targetIndex) {
      for(let i = targetIndex; i >= -1; i--) {
        if(i == -1 || !isSegmentEmpty(segments[i])) return i
      }
      return currentIndex
    }
  }

  return targetIndex
}

export const ensureLastEmptySegment = (segments, timestamp, isPlaybackMode) => {
  if(isPlaybackMode) {
    return segments
  }

  const lastSegment = segments[segments.length - 1]
  if(!lastSegment || !isSegmentEmpty(lastSegment)) {
    return [
      ...segments,
      {timestamp}
    ]
  } else {
    let lastEmptyIndex = segments.length - 1
    for (let i = lastEmptyIndex; i > 0; i--) {
      if(segments[i - 1] && isSegmentEmpty(segments[i - 1])) {
        lastEmptyIndex = i - 1
      } else {
        break
      }
    }
    return (lastEmptyIndex == segments.length - 1) ? segments : segments.slice(0, lastEmptyIndex + 1)
  }
}
