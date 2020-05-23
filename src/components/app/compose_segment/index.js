import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPlus,
  faArrowsAlt
} from '@fortawesome/free-solid-svg-icons'
import {
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc'
import {
  indexSelector,
  segmentsSelector,
  segmentImageUploadKeySelectorFactory
} from '../../../state/selectors/current_stream'
import {
  removeSegment as removeSegmentAction,
  goToSegment as goToSegmentAction,
  addSegment as addSegmentAction
} from '../../../state/actions/stream'
import {
  addImage as addImageAction,
  removeImage,
} from '../../../state/actions/image'
import {
  setSegmentScript as setSegmentScriptAction,
  setSegmentText,
  newScript
} from '../../../state/actions/segment'
import {
  removeRecording as removeRecordingAction
} from '../../../state/actions/recorder'
import {
  isSegmentEmpty as isEmpty,
  segmentHasVisual as hasVisual
} from '../../../lib/stream'
import AudioInput from '../audio_input'
import SegmentImage from '../segment_image'
import ImageInput from '../../lib/image_input'
import TextInput from '../../lib/text_input'
import AspectRatioBox from '../../lib/aspect_ratio_box'
import config from '../../../../config'
import styles from './compose_segment.css'

const ComposeSegment = SortableElement(({locIndex}) => {
  const index = locIndex
  const currentIndex = useSelector(indexSelector)
  const segments = useSelector(segmentsSelector)
  const segment = segments[index] || {}
  const nextSegment = segments[index + 1] || {}
  const isLastSegment = index == segments.length - 1

  const { audio, script, image, text } = segment

  const dispatch = useDispatch();
  const removeSegment = () => dispatch(removeSegmentAction(index, !isSegmentEmpty))
  const addSegment = (e) => {
    dispatch(addSegmentAction(index + 1))
    e.stopPropagation()
  }
  const goToSegment = () => dispatch(goToSegmentAction(index))

  const isSegmentEmpty = isEmpty(segment)
  const segmentHasVisual = hasVisual(segment)
  const isNextSegmentEmpty = isEmpty(nextSegment)
  const canAppendSegment = !isSegmentEmpty && !isNextSegmentEmpty
  const canDeleteSegment = !isSegmentEmpty || index != segments.length - 1
  const isCurrent = index == currentIndex

  const removeRecording = () => {
    dispatch(removeRecordingAction(index))
  }

  const setSegmentScript = (e) => {
    dispatch(setSegmentScriptAction(e.target.value, index))
  }

  const handleKeyDown = (e) => {
    if(e.keyCode == 13) {
      e.preventDefault()
      dispatch(newScript(index))
    }
  }

  const scriptRef = useRef(null)

  useEffect(() => {
    if(isCurrent && !isVisualMode) {
      scriptRef.current.focus()
    }
  }, [isCurrent])

  // autoresize textarea
  const autoResize = () => {
    if(scriptRef.current) {
      const textarea = scriptRef.current
      textarea.style.height = "1px"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    autoResize()
  }, [scriptRef.current, isVisualMode])

  // toggle visual mode
  const [isVisualMode, setIsVisualMode] = useState(false)

  useEffect(() => {
    if(!isCurrent) {
      switchOffVisualMode()
    }
  }, [isCurrent])

  // scrolling current segment into view
  const htmlRef = useRef(null)
  useEffect(() => {
    if(isCurrent){
      setTimeout(() => {
        htmlRef.current.scrollIntoView({behavior: "smooth", block: "center"})
      }, 100)
    }
  }, [isCurrent])

  useEffect(() => {
    if(!isLastSegment && isCurrent) {
      const el = htmlRef.current.parentElement
      el.scrollTo({
        top: el.scrollHeight,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [isLastSegment])

  // adding image
  const imageUploadKey = useSelector(segmentImageUploadKeySelectorFactory(index))
  const addImage = (e) => {
    dispatch(addImageAction(e, imageUploadKey, {index: index}))
    switchOnVisualMode()
  }

  // clearing image / text
  const clearVisual = () => {
    if(image) {
      dispatch(removeImage(index))
    }
    if(text) {
      dispatch(setSegmentText("", index))
    }
    switchOffVisualMode()
  }

  // adding text
  const addText = () => {
    switchOnVisualMode('text')
  }

  const handleTextChange = (newText) => dispatch(setSegmentText(newText, index))

  // switch to visual mode
  const switchOnVisualMode = (contentType) => {
    !isVisualMode && setIsVisualMode(contentType || true)
  }

  const switchOffVisualMode = () => {
    isVisualMode && setIsVisualMode(false)
  }

  const DragHandle = SortableHandle(() => (
    <button
      className={classnames(
        styles.removeSegmentBtn,
        styles.dragHandle
      )}
      onClick={(e) => {e.stopPropagation()}}
    >
      <FontAwesomeIcon className={styles.removeSegmentBtn_icon} icon={faArrowsAlt} />
    </button>
  ))

  return (
    <div className={classnames(
        styles.composeSegment,
        {
          [styles.selectedSegment]: isCurrent
        }
      )}
      ref={htmlRef}
      onClick={goToSegment}
    >

      <div className={styles.controls}>
        <DragHandle />
        {canDeleteSegment && (
          <button
            className={styles.removeSegmentBtn}
            onClick={removeSegment}
          >
            <FontAwesomeIcon className={styles.removeSegmentBtn_icon} icon={faTrash} />
          </button>
        )}
      </div>

      <div className={classnames(
        styles.content,
        {
          [styles.visualMode]: isVisualMode
        }
      )}>
        {canAppendSegment && (
          <button
            className={styles.addSegmentBtn}
            onClick={addSegment}
          >
            <FontAwesomeIcon className={styles.addSegmentBtn_icon} icon={faPlus} />
          </button>
        )}

        <div className={styles.script}>
          <textarea
            className={styles.scriptInput}
            value={script}
            onChange={setSegmentScript}
            onKeyDown={handleKeyDown}
            onInput={autoResize}
            placeholder="Script goes here"
            maxLength={config.stream.script.maxLength}
            ref={scriptRef}
          />

          { !audio && (
            <AudioInput index={index}/>
          )}

          { audio && (
            <>
              <audio
                className={styles.audioPlayer}
                controls
                src={audio.url}
              />
              <button
                className={styles.removeRecordingBtn}
                onClick={removeRecording}
              >
                Clear
              </button>
            </>
          )}
        </div>

        <div className={styles.visual}>
          { (segmentHasVisual || isVisualMode) && (
            <AspectRatioBox className={styles.arBox}>
              <div className={styles.visualContent}
                onClick={() => switchOnVisualMode()}
              >
                { image && (
                  <SegmentImage
                    image={image}
                    editable={isVisualMode}
                    isSmall={!isVisualMode}
                  />
                )}

                { (text || isVisualMode == 'text') && (
                  <TextInput
                    value={text || ''}
                    minSize={isVisualMode ? 5 : 1}
                    maxSize={isVisualMode ? 5 : 1}
                    onChange={handleTextChange}
                    maxChars={200}
                    prompt="Write something..."
                    shouldFocus
                  />
                )}
              </div>
              <div className={styles.visualActions}>
                {isVisualMode && (
                  <button onClick={switchOffVisualMode}>
                    Shrink
                  </button>
                )}
                <button onClick={clearVisual}>
                  Clear
                </button>
              </div>
            </AspectRatioBox>
          )}

          { (!segmentHasVisual && !isVisualMode) && (
            <div className={styles.visualOptions}>
              <ImageInput
                onChange={addImage}
                buttonDisplay
              />

              <button
                className={styles.addText}
                onClick={addText}
              >
                T
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

ComposeSegment.propTypes = {
  locIndex: PropTypes.number.isRequired
}

export default ComposeSegment
