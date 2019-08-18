import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setStreamTitle } from '../../../state/actions/stream'
import Cover from '../cover'
import Segment from '../segment'
import Footer from '../footer'
import styles from './stream.css'

const Stream = () => {
  const currentStream = useSelector(state => state.currentStream);
  const { title, segments, currentSegment } = currentStream
  const { index } = currentSegment

  const dispatch = useDispatch();
  const onTitleChange = (event) => dispatch(setStreamTitle(event.target.value))

  const segment = segments[index]

  return (
    <div className={styles.stream}>
      {
        !segment && (
          <Cover title={title} onTitleChange={onTitleChange} />
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

      <Footer />
    </div>
  )
}

export default Stream
