import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import styles from './segment_overview.css'

const SegmentOverview = ({segment, index, onSegmentClick, onRemoveSegmentClick}) => {
  return (
    <div
      className={styles.segmentOverview}
      onClick={onSegmentClick}
    >
      { segment.text }
      { segment.image && (
        <img src={segment.image.src} />
      )}
      { segment.audio && (
        <FontAwesomeIcon className={styles.audioIcon}
          size={'1x'}
          icon={faVolumeUp}
        />
      )}
    </div>
  )
}

export default SegmentOverview
