import config from '../../config'

export const streamDuration = (segments, until) => {
  const list = (until == undefined) ? segments : segments.slice(0, until)

  return list.reduce(
    (totalTime, segment) => totalTime + segmentDuration(segment),
    0
  )
}

const maxDuration = config.stream.maxDuration
export const remainingTime = (segments) => maxDuration - streamDuration(segments)

export const canAddContent = (segments, index, content) => {
  if(segments[index]) {
    const oldRemainingTime = remainingTime(segments)

    const newSegments = [
      ...segments.slice(0, index),
      { ...segments[index], ...content },
      ...segments.slice(index + 1, segments.length)
    ]

    const newRemainingTime = remainingTime(newSegments)

    return newRemainingTime > 0 || newRemainingTime == oldRemainingTime
  }

  return remainingTime(segments) >= 1000
}

export const remainingTimeWithoutIndex = (segments, index) => (
  remainingTime([
    ...segments.slice(0, index),
    ...segments.slice(index + 1, segments.length)
  ])
)

export const remainingCharCountWithoutIndex = (segments, index) => {
  const time = remainingTimeWithoutIndex(segments, index)
  return textForTime(time)
}

export const segmentDuration = ({ audio, text, image, script }) => {
  return (
    (audio && audio.duration) ||
    (text && timeForText(text, 1000)) ||
    (image && timeForImage(image)) ||
    (script && timeForText(script, 1000)) ||
    0
  )
}

const millisecondsPerCharacter = 60

const timeForImage = (image) => timeForText(image.caption, 0) + 2000

const timeForText = (text = '', minimum) => {
  return Math.max(millisecondsPerCharacter * text.length, minimum)
}

const textForTime = (time) => parseInt(time / millisecondsPerCharacter)
