import { segmentDuration } from './stream_duration'

const maxSubtitleLength = 50
const margin = 30

export const subtitlesForScript = (segment) => {
  const { script } = segment

  let timestamp = 0
  let subtitle = script || ""
  let textBreak = 0
  let newSubtitle

  const totalTime = segmentDuration(segment)
  const timePerChar = totalTime / subtitle.length

  const result = []
  
  while(subtitle.length > 0) {
    let spaceFound = false

    if(subtitle.length <= maxSubtitleLength) {
      textBreak = subtitle.length
      newSubtitle = subtitle.slice(0, textBreak)
    } else {
      textBreak = maxSubtitleLength

      for(let i = maxSubtitleLength; i >= (maxSubtitleLength - margin); i--) {
        if(subtitle[i] == ' ') {
          textBreak = i + 1 // do not include the space
          newSubtitle = subtitle.slice(0, i)
          spaceFound = true
          break
        }
      }

      if(!spaceFound) {
        newSubtitle = subtitle.slice(0, textBreak) + '-'
      }
    }

    result.push({
      timestamp,
      subtitle: newSubtitle
    })

    subtitle = subtitle.slice(textBreak)
    timestamp += timePerChar * textBreak
  }

  return result
}

export const subtitleForOffset = (subtitles, offset) => {
  const currentSubtitle = subtitles.find((object, index) => {
    const { timestamp } = object
    return timestamp <= offset && (!subtitles[index + 1] || subtitles[index + 1].timestamp > offset)
  })

  return currentSubtitle ? currentSubtitle.subtitle : ""
}

export const timeUntilNextSubtitle = (subtitles, offset) => {
  const nextSubtitle = subtitles.find((object) => {
    const { timestamp } = object
    return timestamp > offset
  })

  return nextSubtitle ? nextSubtitle.timestamp - offset : null
}
