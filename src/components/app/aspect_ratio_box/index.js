import React from 'react'
import PropTypes from 'prop-types'
import styles from './aspect_ratio_box.css'

const AspectRatioBox = ({children}) => {
  return (
    <div className={styles.aspectRatioBox}>
      { children }
    </div>
  )
}

AspectRatioBox.propTypes = {
  children: PropTypes.node
}

export default AspectRatioBox
