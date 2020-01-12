import React from 'react'
import PropTypes from 'prop-types'
import styles from './image_display.css'
import config from '../../../../config'
import TextInput from '../text_input'

const ImageDisplay = ({ src, caption, editable, onEdit }) => {
  const onCaptionChange = (event) => onEdit(event.target.value)
  const { captionMaxLength } = config.stream.image
  return (
    <figure className={styles.imageDisplay}>
      <img src={src} />
      { (editable || caption) && (
        <figcaption className={styles.caption}>
          <TextInput
            readOnly={!editable}
            value={caption || ''}
            minSize={3}
            maxSize={3}
            onChange={onCaptionChange}
            maxChars={captionMaxLength}
            prompt="Add a caption"
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
