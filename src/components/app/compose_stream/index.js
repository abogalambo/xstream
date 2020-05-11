import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import {
  segmentsSelector,
  indexSelector
} from '../../../state/selectors/current_stream'
import {
  goToSegment
} from '../../../state/actions/stream'
import Autosave from '../autosave'
import ComposeSegment from '../compose_segment'
import styles from './compose_stream.css'

const ComposeStream = () => {
  const segments = useSelector(segmentsSelector)
  const currentIndex = useSelector(indexSelector)

  // keyboard navigation
  const dispatch = useDispatch()
  const indexRef = useRef()
  indexRef.current = currentIndex

  const handleKeydown = (e) => {
    if(e.keyCode === 40) {
      dispatch(goToSegment(indexRef.current + 1))
    }else if(e.keyCode === 38) {
      dispatch(goToSegment(indexRef.current - 1))
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [])

  return (
    <>
      <div
        className={styles.composeStream}
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
