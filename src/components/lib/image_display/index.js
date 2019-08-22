import React from 'react'
import PropTypes from 'prop-types'
import styles from './image_display.css'

const ImageDisplay = ({ src }) => (
  <img
    className={styles.imageDisplay}
    src={src}
  />
)

ImageDisplay.propTypes = {
  src: PropTypes.string.isRequired
}

export default ImageDisplay
