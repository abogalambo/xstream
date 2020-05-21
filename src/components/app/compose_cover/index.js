import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {
  coverImageUploadKeySelector,
  coverDataSelector,
  indexSelector
} from '../../../state/selectors/current_stream'
import {
  setStreamTitle,
  goToSegment as goToSegmentAction,
  addCoverImage as addCoverImageAction,
  removeCoverImage as removeCoverImageAction,
} from '../../../state/actions/stream'
import ImageInput from '../../lib/image_input'
import TextInput from '../../lib/text_input'
import config from '../../../../config'
import styles from './compose_cover.css'

const ComposeCover = () => {
  const { title, cover: image } = useSelector(coverDataSelector)
  const hasImage = image && image.src
  const coverStyle = hasImage ? {
    backgroundImage: `url(${image.src})`
  } : {}
  const index = -1

  const dispatch = useDispatch()

  const handleTitleChange = (newTitle) => dispatch(setStreamTitle(newTitle))

  const goToCover = () => dispatch(goToSegmentAction(index))

  const currentIndex = useSelector(indexSelector)
  const isCurrent = index == currentIndex

  // scrolling cover into view
  const htmlRef = useRef(null)
  useEffect(() => {
    if(isCurrent){
      setTimeout(() => {
        htmlRef.current.scrollIntoView({behavior: "smooth", block: "center"})
      }, 100)
    }
  }, [isCurrent])

  // adding / remove image
  const imageUploadKey = useSelector(coverImageUploadKeySelector)
  const addCoverImage = (e) => dispatch(addCoverImageAction(e, imageUploadKey))
  const removeCoverImage = () => dispatch(removeCoverImageAction())

  return (
    <div className={classnames(
        styles.composeCover,
        {
          [styles.selected]: isCurrent,
          [styles.withImage]: hasImage && isCurrent
        }
      )}
      ref={htmlRef}
      onClick={goToCover}
    >
      <div className={styles.controls}>
        {hasImage && (
          <button
            className={styles.removeImage}
            onClick={removeCoverImage}
          >
            <FontAwesomeIcon
              className={styles.removeImage_icon}
              size={'2x'}
              icon={faTimes}
            />
          </button>
        )}

        <ImageInput
          onChange={addCoverImage}
          buttonDisplay
          className={'cover'}
        />
      </div>

      <div className={styles.content} style={coverStyle}>
        <TextInput
          value={title}
          minSize={3}
          maxSize={3}
          onChange={handleTitleChange}
          maxChars={config.stream.titleMaxLength}
          prompt="Add a title"
          shouldFocus={isCurrent}
        />
      </div>
    </div>
  )
}

export default ComposeCover
