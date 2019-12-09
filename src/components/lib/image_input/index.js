import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import styles from './image_input.css'
import classnames from 'classnames'

const ImageInput = ({onChange, buttonDisplay, text}) => {
  const randomId = new Date().getTime()

  return (
    <div className={styles.imageInput}>
      <label htmlFor={randomId}>
        <FontAwesomeIcon
          className={classnames(
            styles.imageInputIcon,
            { [styles.imageInputIcon_button]: buttonDisplay }
          )}
          icon={faCamera} />
        {text && (
          <span>{text}</span>
        )}
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
  buttonDisplay: PropTypes.bool,
  text: PropTypes.string
}

export default ImageInput
