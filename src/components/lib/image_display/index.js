import React from 'react'
import PropTypes from 'prop-types'
import styles from './image_display.css'

const ImageDisplay = ({ src, caption, editable, onEdit }) => {
  const onCaptionChange = (event) => onEdit(event.target.value)
  return (
    <figure className={styles.imageDisplay}>
      <img src={src} />
      { (editable || caption) && (
        <figcaption className={styles.caption}>
          <textarea
            value={caption}
            onChange={onCaptionChange}
            maxLength={100}
            placeholder={editable ? "Add Caption" : ""}
            disabled={!editable}
          />
        </figcaption>
      )}
    </figure>
  )
}

ImageDisplay.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string,
  editable: PropTypes.bool,
  onEdit: PropTypes.func
}

export default ImageDisplay
