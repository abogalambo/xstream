import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExpandAlt,
  faCompressAlt
} from '@fortawesome/free-solid-svg-icons'
import {
  setImageCaption as setImageCaptionAction,
  setImageStyle as setImageStyleAction
} from '../../../state/actions/image'
import ImageDisplay from '../../lib/image_display'
import styles from './segment_image.css'

const SegmentImage = ({image, editable, isSmall}) => {
  const isCoverImageStyle = image && (image.style == 'COVER')

  const dispatch = useDispatch();
  const setImageCaption = (caption) => dispatch(setImageCaptionAction(caption))

  const setImageStyle = () => {
    const newStyle = isCoverImageStyle ? 'FIT' : 'COVER'
    dispatch(setImageStyleAction(newStyle))
  }

  return (
    <div
      style={isCoverImageStyle ? {width: "100%"} : {}}
      className={styles.imageWrapper}
    >
      <ImageDisplay
        {...image}
        editable={editable}
        isSmall={isSmall}
        onEdit={setImageCaption}
      />

      { editable && (
        <div className={styles.imageControls}>
          <button>
            <FontAwesomeIcon
              onClick={setImageStyle}
              icon={isCoverImageStyle ? faCompressAlt : faExpandAlt}
              size="2x"
            />
          </button>
        </div>
      )}
    </div>
  )
}

SegmentImage.propTypes = {
  image: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  isSmall: PropTypes.bool
}

export default SegmentImage
