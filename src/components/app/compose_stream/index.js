import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import {
  segmentsSelector,
  indexSelector
} from '../../../state/selectors/current_stream'
import Autosave from '../autosave'
import ComposeSegment from '../compose_segment'
import styles from './compose_stream.css'

const ComposeStream = () => {
  const segments = useSelector(segmentsSelector)
  const currentIndex = useSelector(indexSelector)

  const htmlRef = useRef(null)
  useEffect(() => {
    const currentChild = htmlRef.current.children[currentIndex + 1]
    if(currentChild){
      currentChild.scrollIntoView({behavior: "smooth", block: "center"})
    }
  }, [currentIndex])

  return (
    <>
      <div
        className={styles.composeStream}
        ref={htmlRef}
      >
        <div className={classnames(
            styles.composeCover,
            {
              [styles.selectedCover]: currentIndex == -1
            }
          )}
          key="compose_cover"
        >
          <span>Cover</span>
        </div>
        {segments.map((segment, index) => (
          <ComposeSegment
            index={index}
            key={`compose_segment_${segment.timestamp}`}
          />
        ))}
      </div>
      <Autosave />
    </>
  )
}

export default ComposeStream
