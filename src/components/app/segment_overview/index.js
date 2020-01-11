import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons'
import styles from './segment_overview.css'

const SegmentOverview = ({segment, isSelected, onSegmentClick, onRemoveSegmentClick, isPlaybackMode}) => {
  const htmlRef = useRef(null)

  useEffect(() => {
    if(isSelected){
      htmlRef.current.scrollIntoView({behavior: "smooth", block: "center"})
    }
  }, [isSelected])

  return (
    <div
      className={classnames(
        styles.segmentOverview,
        { [styles.selected]: isSelected }
      )}
      ref={htmlRef}
      onClick={onSegmentClick}
    >
      <p className={styles.segmentOverviewText}>{ segment.text }</p>
      { segment.image && (
        <img src={segment.image.src} />
      )}
      { segment.audio && (
        <FontAwesomeIcon
          className={styles.audioIcon}
          icon={faVolumeUp}
        />
      )}
      {!isPlaybackMode && (<FontAwesomeIcon
        className={styles.removeSegmentIcon}
        onClick={onRemoveSegmentClick}
        icon={faTimes}
      />)}
    </div>
  )
}

SegmentOverview.propTypes = {
  segment: PropTypes.object.isRequired,
  onSegmentClick: PropTypes.func.isRequired,
  onRemoveSegmentClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  isPlaybackMode: PropTypes.bool
}

export default SegmentOverview
