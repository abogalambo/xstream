import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './progress_bar.css'

const ProgressBar = ({percent}) => {
  return (
    <div className={styles.progressBar}>
      <div className={classnames(styles.background, styles.bar)} />
      <div
        className={classnames(styles.foreground, styles.bar)}
        style={ { width: `${percent}%` } }
      />
    </div>
  )
}

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired
}

export default ProgressBar;
