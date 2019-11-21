import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import styles from './segment_overview.css'

const SegmentOverview = ({segment, onSegmentClick, onRemoveSegmentClick}) => {
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
        <FontAwesomeIcon
          className={styles.audioIcon}
          size={'1x'}
          icon={faVolumeUp}
        />
      )}
      <FontAwesomeIcon
        className={styles.removeSegmentIcon}
        onClick={onRemoveSegmentClick}
        size={'1x'}
        icon={faTimes}
      />
    </div>
  )
}

SegmentOverview.propTypes = {
  segment: PropTypes.object.isRequired,
  onSegmentClick: PropTypes.func.isRequired,
  onRemoveSegmentClick: PropTypes.func.isRequired
}

export default SegmentOverview
