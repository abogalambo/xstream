import React from 'react'
import PropTypes from 'prop-types'
import Cover from '../cover'
import Segment from '../segment'
import styles from './stream.css'

const Stream = ({
  title,
  segments,
  currentSegment,
  onTitleChange,
  onAddSegmentClick,
  onRemoveSegmentClick,
  onNextSegmentClick,
  onPreviousSegmentClick
}) => {
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
        <button onClick={onNextSegmentClick}> {">"} </button>
        <button onClick={onPreviousSegmentClick}> {"<"} </button>
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

Stream.propTypes = {
  title: PropTypes.string.isRequired,
  segments: PropTypes.array.isRequired,
  currentSegment: PropTypes.object.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onAddSegmentClick: PropTypes.func.isRequired,
  onRemoveSegmentClick: PropTypes.func.isRequired,
  onNextSegmentClick: PropTypes.func.isRequired,
  onPreviousSegmentClick: PropTypes.func.isRequired
}

export default Stream
