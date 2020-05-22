import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons'
import styles from './image_input.css'
import classnames from 'classnames'

const ImageInput = ({onChange, buttonDisplay, text, className, disabled, isLightIcon}) => {
  const randomId = new Date().getTime()

  return (
    <div className={classnames(
      styles.imageInput,
      styles[className],
      { [styles.disabled]: disabled }
    )}>
      <label htmlFor={randomId}>
        <FontAwesomeIcon
          className={classnames(
            styles.imageInputIcon,
            {
              [styles.imageInputIcon_button]: buttonDisplay,
              [styles.imageInputIcon_light]: isLightIcon,
              [styles.imageInputIcon_dark]: !isLightIcon
            }
          )}
          icon={faImage}
        />
        {text && (
          <span>{text}</span>
        )}
      </label>
      {!disabled && (
        <input
          accept="image/*"
          id={randomId}
          type="file"
          value=""
          onChange={onChange}
        />
      )}
    </div>
  )
}

ImageInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  buttonDisplay: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string,
  isLightIcon: PropTypes.bool
}

export default ImageInput
