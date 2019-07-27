import React from 'react'
import PropTypes from 'prop-types'
import Cover from '../cover'
import Segment from '../segment'

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
    <div>
      <span> Current Index: { currentSegment.index } </span>
      <button onClick={onAddSegmentClick}> + </button>
      <button onClick={onRemoveSegmentClick}> - </button>
      <button onClick={onNextSegmentClick}> {">"} </button>
      <button onClick={onPreviousSegmentClick}> {"<"} </button>

      {
        (index == -1) && (
          <Cover title={title} onTitleChange={onTitleChange} />
        )
      }

      {
        previousSegment && (
          <Segment key={`segment_${index - 1}`} {...previousSegment} previous />
        )
      }

      {
        segment && (
          <Segment key={`segment_${index}`} {...segment} current />
        )
      }

      {
        nextSegment && (
          <Segment key={`segment_${index + 1}`} {...nextSegment} next />
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
