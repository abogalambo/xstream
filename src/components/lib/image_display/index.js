import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './image_display.css'
import config from '../../../../config'
import TextInput from '../text_input'

const ImageDisplay = ({ src, caption, style, editable, onEdit }) => {
  const onCaptionChange = (newCaption) => onEdit(newCaption)
  const { captionMaxLength } = config.stream.image
  const isCoverStyle = (style == 'COVER')
  const figureStyle = isCoverStyle ? {
    backgroundImage: `url(${src})`,
    width: '100%',
    height: '100%'
  } : {}

  return (
    <figure
      className={styles.imageDisplay}
      style={figureStyle}
    >
      {!isCoverStyle && (
        <img src={src} />
      )}

      { (editable || caption) && (
        <figcaption 
          className={classnames(styles.caption, {
            [styles.caption_cover]: isCoverStyle
          })}
        >
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
  style: PropTypes.string,
  editable: PropTypes.bool,
  onEdit: PropTypes.func
}

export default ImageDisplay
