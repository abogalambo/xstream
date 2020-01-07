import React from 'react'
import PropTypes from 'prop-types'
import styles from './progress_bar.css'

const ProgressBar = ({percent}) => {
  return (
    <div className={styles.progressBar_track}>
      <div
        className={styles.progressBar_indicator}
        style={ { width: `${percent}%` } }
      />
    </div>
  )
}

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired
}

export default ProgressBar;
