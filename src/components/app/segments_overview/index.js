import React from 'react'
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import {
  isPlaybackModeSelector
} from '../../../state/selectors/current_stream'

import styles from './segments_overview.css'

const SegmentsOverview = () => {
  const isPlaybackMode = useSelector(isPlaybackModeSelector)

  return (
    <div className={classnames(
        styles.segmentsOverview,
        {
          [styles.collapsed]: isPlaybackMode
        }
    )}>
    </div>
  )
}

export default SegmentsOverview
