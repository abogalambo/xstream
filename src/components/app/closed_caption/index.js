import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  currentSegmentSelector,
  currentSegmentDataSelector,
  isSegmentStartedSelector
} from '../../../state/selectors/current_stream'
import {
  subtitlesForScript,
  subtitleForOffset,
  timeUntilNextSubtitle
} from '../../../lib/subtitles'
import styles from './closed_caption.css'

const ClosedCaption = () => {

  const currentSegmentData = useSelector(currentSegmentDataSelector)
  const currentSegment = useSelector(currentSegmentSelector)
  const isSegmentStarted = useSelector(isSegmentStartedSelector)

  const captions = subtitlesForScript(currentSegmentData)

  const {startedAt, startOffset} = currentSegment
  const offset = isSegmentStarted ? (new Date().getTime()) - startedAt : startOffset


  // rerendering
  const [blah, setBlah] = useState(true)
  const [nextTimeout, setNextTimeout] = useState(null)

  const triggerRerender = () => {
    setBlah(!blah)

    const remainingTime = timeUntilNextSubtitle(captions, offset - 100)

    if(remainingTime != null) {
      setNextTimeout(
        setTimeout(() => {
          triggerRerender()
        }, remainingTime)
      )
    }
  }

  useEffect(() => {
    if(isSegmentStarted) {
      triggerRerender()
    } else {
      clearTimeout(nextTimeout)
    }

    return () => { nextTimeout && clearTimeout(nextTimeout) }
  }, [isSegmentStarted])
  
  const subtitle = subtitleForOffset(captions, offset)

  return (
    subtitle ? (
      <span className={styles.closedCaption}>
        {subtitle}
      </span>
      ) : null
  )
}

export default ClosedCaption
