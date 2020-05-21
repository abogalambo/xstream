import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import {
  playStream
} from '../../../state/actions/playback'
import {
  coverDataSelector
} from '../../../state/selectors/current_stream'
import TextInput from '../../lib/text_input'
import styles from './cover.css'
import config from '../../../../config'

const Cover = () => {
  const { title, cover: image } = useSelector(coverDataSelector)
  const dispatch = useDispatch()
  const handleClick = () => dispatch(playStream())

  const hasImage = image && image.src
  const coverStyle = hasImage ? {
    backgroundImage: `url(${image.src})`
  } : {}

  return (
    <div
      className={styles.cover}
      style={coverStyle}
    >
      <div className={styles.titleConainer}>
        <TextInput
          readOnly
          value={title}
          maxSize={15}
          minSize={5}
          maxChars={config.stream.titleMaxLength}
          withStroke
        />
      </div>

      <button
        onClick={handleClick}
        className={styles.FAB}
      >
        <FontAwesomeIcon
          className={styles.FAB_icon}
          size={'3x'}
          icon={faPlay}
        />
      </button>
    </div>
  )
}

export default Cover
