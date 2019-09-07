import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons'
import styles from './image_input.css'

const ImageInput = ({onChange}) => {
  const randomId = new Date().getTime()

  return (
    <div className={styles.imageInput}>
      <label htmlFor={randomId}>
        <FontAwesomeIcon size="5x" icon={faImage} />
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
  onChange: PropTypes.func.isRequired
}

export default ImageInput
