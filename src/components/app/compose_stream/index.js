import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import {
  segmentsSelector,
  indexSelector
} from '../../../state/selectors/current_stream'
import {
  goToSegment,
} from '../../../state/actions/stream'
import Autosave from '../autosave'
import styles from './compose_stream.css'

const ComposeStream = () => {
  const dispatch = useDispatch()
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
            styles.composeSegment,
            {
              [styles.selectedSegment]: currentIndex == -1
            }
          )}
          key="compose_cover"
        >
          <span>Cover</span>
        </div>
        {segments.map((segment, index) => {
          return (
            <div className={classnames(
                styles.composeSegment,
                {
                  [styles.selectedSegment]: index == currentIndex
                }
              )}
              key={`compose_segment_${segment.timestamp}`}
              onClick={() => { dispatch(goToSegment(index)) }}
            >
              <span>{segment.text}</span>
            </div>
          )
        })}
      </div>
      <Autosave />
    </>
  )
}

export default ComposeStream
