import config from '../../config'

export const streamDuration = (segments, until) => {
  const list = (until == undefined) ? segments : segments.slice(0, until)

  return list.reduce(
    (totalTime, segment) => totalTime + segmentDuration(segment),
    0
  )
}

const maxDuration = config.stream.maxDuration
export const remainingTime = (segments) => Math.max(maxDuration - streamDuration(segments), 0)

export const canAddContent = (segments, index, content) => {
  if(segments[index]) {
    const newSegments = [
      ...segments.slice(0, index),
      { ...segments[index], ...content },
      ...segments.slice(index + 1, segments.length)
    ]

    return remainingTime(newSegments) > 0
  }

  return remainingTime(segments) >= 1000
}

export const segmentDuration = ({ audio, text, image }) => {
  return (
    (audio && audio.duration) ||
    (text && timeForText(text, 1000)) ||
    (image && timeForImage(image)) ||
    1000
  )
}

const timeForImage = (image) => timeForText(image.caption, 0) + 2000

const timeForText = (text = '', minimum) => {
  const millisecondsPerCharacter = 60
  return Math.max(millisecondsPerCharacter * text.length, minimum)
}
