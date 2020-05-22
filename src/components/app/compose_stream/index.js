import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc'
import {
  segmentsSelector,
  indexSelector
} from '../../../state/selectors/current_stream'
import {
  goToSegment,
  reorderSegments
} from '../../../state/actions/stream'
import Autosave from '../autosave'
import ComposeCover from '../compose_cover'
import ComposeSegment from '../compose_segment'
import styles from './compose_stream.css'

const SortableComposeStream = SortableContainer(() => {
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
    <div className={styles.wrapper}>
      <div
        className={styles.composeStream}
      >
        <ComposeCover />
        {segments.map((segment, index) => (
          <ComposeSegment
            index={index}
            locIndex={index}
            key={`compose_segment_${segment.timestamp}`}
          />
        ))}
      </div>
      <Autosave />
    </div>
  )
})

const ComposeStream = () => {
  const dispatch = useDispatch()
  const onSortEnd = ({oldIndex, newIndex}) => {
    if(oldIndex === newIndex) return
    dispatch(reorderSegments(oldIndex, newIndex))
  }

  return (
    <SortableComposeStream
      onSortEnd={onSortEnd}
      distance={3}
      useDragHandle
      axis="y"
      lockAxis="y"
    />
  )
}

export default ComposeStream
