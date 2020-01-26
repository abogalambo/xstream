export const streamDuration = (segments, until) => {
  const list = (until == undefined) ? segments : segments.slice(0, until)

  return list.reduce(
    (totalTime, segment) => totalTime + segmentDuration(segment),
    0
  )
}

export const segmentDuration = (segment) => {
  const { audio, text, image } = segment
  return (
    (audio && audio.duration) ||
    (text && timeForText(text, 1000)) ||
    (image && timeForText(image.caption, 0) + 2000) ||
    1000
  )
}

const timeForText = (text = '', minimum) => {
  const millisecondsPerCharacter = 60
  return Math.max(millisecondsPerCharacter * text.length, minimum)
}
