import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';
import TextInput from '../../lib/text_input'
import ImageDisplay from '../../lib/image_display'
import styles from './segment.css'

const Playback = ({ text, image }) => (
  <div className={styles.segment}>
    <div className={classnames(
      styles.mediaInput,
      {
        [styles.collapsed]: !text
      }
    )}>
      { text && (
        <TextInput
          value={text}
          disabled
        />
      )}
    </div>

    <div className={classnames(
      styles.mediaInput,
      {
        [styles.collapsed]: !image
      }
    )}>
      { image && (
        <ImageDisplay {...image} />
      )}
    </div>
  </div>
)

Playback.propTypes = {
  text: PropTypes.string,
  image: PropTypes.object
}

export default Playback
