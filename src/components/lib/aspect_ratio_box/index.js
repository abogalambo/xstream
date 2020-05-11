import React from 'react'
import PropTypes from 'prop-types'
import styles from './aspect_ratio_box.css'

const AspectRatioBox = ({children, className}) => {
  return (
    <div className={className}>
      <div className={styles.aspectRatioBox}>
        <div className={styles.aspectRatioInnerBox}>
          { children }
        </div>
      </div>
    </div>
  )
}

AspectRatioBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default AspectRatioBox
