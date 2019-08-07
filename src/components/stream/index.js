import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux';
import {
  setStreamTitle,
  addSegment,
  removeSegment,
  nextSegment as nextSegmentAction,
  previousSegment as previousSegmentAction
} from '../../state/actions/stream'
import Cover from '../cover'
import Segment from '../segment'
import styles from './stream.css'

const Stream = ({
}) => {
  const currentStream = useSelector(state => state.currentStream);
  const { title, segments, currentSegment } = currentStream

  const dispatch = useDispatch();
  const onTitleChange = (event) => dispatch(setStreamTitle(event.target.value))
  const onAddSegmentClick = () => dispatch(addSegment())
  const onRemoveSegmentClick = () => dispatch(removeSegment())
  const onNextSegmentClick = () => dispatch(nextSegmentAction())
  const onPreviousSegmentClick = () => dispatch(previousSegmentAction())

  const { index } = currentSegment
  const previousSegment = segments[index - 1]
  const segment = segments[index]
  const nextSegment = segments[index + 1]

  return (
    <div className={styles.stream}>
      <div className={styles.controls}>
        <span> Current Index: { currentSegment.index } </span>
        <button onClick={onAddSegmentClick}> + </button>
        <button onClick={onRemoveSegmentClick}> - </button>
        <button onClick={onPreviousSegmentClick}> {"<"} </button>
        <button onClick={onNextSegmentClick}> {">"} </button>
      </div>

      {
        (index == -1) && (
          <Cover title={title} onTitleChange={onTitleChange} />
        )
      }

      {
        previousSegment && (
          <Segment
            key={`segment_${previousSegment.timestamp}`}
            {...previousSegment}
            previous
          />
        )
      }

      {
        segment && (
          <Segment
            key={`segment_${segment.timestamp}`}
            {...segment}
            current
          />
        )
      }

      {
        nextSegment && (
          <Segment
            key={`segment_${nextSegment.timestamp}`}
            {...nextSegment}
            next
          />
        )
      }
    </div>
  )
}

Stream.propTypes = {}

export default Stream
