import React from 'react'
import { useSelector } from 'react-redux';
import {
  showCoverSelector,
  currentSegmentDataSelector
} from '../../../state/selectors/current_stream'
import Cover from '../cover'
import Segment from '../segment'
import Footer from '../footer'
import styles from './stream.css'

const Stream = () => {
  const showCover = useSelector(showCoverSelector)
  const segment = useSelector(currentSegmentDataSelector)

  return (
    <div className={styles.stream}>
      {showCover && (
        <Cover />
      )}

      {segment && (
        <Segment
          key={`segment_${segment.timestamp}`}
          {...segment}
          current
        />
      )}

      {segment && (
        <Footer />
      )}
    </div>
  )
}

export default Stream
