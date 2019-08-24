import React from 'react'
import { useSelector } from 'react-redux';
import Cover from '../cover'
import Segment from '../segment'
import Footer from '../footer'
import styles from './stream.css'

const Stream = () => {
  const currentStream = useSelector(state => state.currentStream);
  const { segments, currentSegment, mode } = currentStream
  const { index } = currentSegment
  const segment = segments[index]

  return (
    <div className={styles.stream}>
      {!segment && (
        <Cover />
      )}

      {segment && (
        <Segment
          key={`segment_${segment.timestamp}`}
          {...segment}
          mode={mode}
        />
      )}

      {segment && (
        <Footer />
      )}
    </div>
  )
}

export default Stream
