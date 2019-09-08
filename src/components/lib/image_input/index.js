import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import styles from './image_input.css'

const ImageInput = ({onChange, buttonDisplay}) => {
  const randomId = new Date().getTime()
  const iconSize = buttonDisplay ? '2x' : '5x'

  return (
    <div className={styles.imageInput}>
      <label htmlFor={randomId}>
        <FontAwesomeIcon size={iconSize} icon={faCamera} />
      </label>
      <input
        accept="image/*"
        id={randomId}
        type="file"
        value=""
        onChange={onChange} />
    </div>
  )
}

ImageInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  buttonDisplay: PropTypes.bool
}

export default ImageInput
