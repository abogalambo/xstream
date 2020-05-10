import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import {
  indexSelector,
  segmentsSelector
} from '../../../state/selectors/current_stream'
import {
  removeSegment as removeSegmentAction,
  goToSegment as goToSegmentAction,
  addSegment as addSegmentAction
} from '../../../state/actions/stream'
import {
  setSegmentScript as setSegmentScriptAction,
  newScript
} from '../../../state/actions/segment'
import {
  removeRecording as removeRecordingAction
} from '../../../state/actions/recorder'
import {
  isSegmentEmpty as isEmpty
} from '../../../lib/stream'
import AudioInput from '../audio_input'
import TextInput from '../../lib/text_input'
import config from '../../../../config'
import styles from './compose_segment.css'

const ComposeSegment = ({index}) => {
  const currentIndex = useSelector(indexSelector)
  const segments = useSelector(segmentsSelector)
  const segment = segments[index] || {}
  const nextSegment = segments[index + 1] || {}

  const { text, audio, script } = segment

  const dispatch = useDispatch();
  const removeSegment = () => dispatch(removeSegmentAction(index))
  const addSegment = (e) => {
    dispatch(addSegmentAction(index + 1))
    e.stopPropagation()
  }
  const goToSegment = () => dispatch(goToSegmentAction(index))

  const isSegmentEmpty = isEmpty(segment)
  const isNextSegmentEmpty = isEmpty(nextSegment)
  const canAppendSegment = !isSegmentEmpty && !isNextSegmentEmpty
  const canDeleteSegment = !isSegmentEmpty || index != segments.length - 1

  const removeRecording = () => {
    dispatch(removeRecordingAction(index))
  }

  const setSegmentScript = (e) => {
    dispatch(setSegmentScriptAction(e.target.value, index))
  }

  const handleKeyDown = (e) => {
    if(e.keyCode == 13) {
      e.preventDefault()
      dispatch(newScript(index + 1))
    }
  }

  const scriptRef = useRef(null)

  useEffect(() => {
    if(index == currentIndex) {
      scriptRef.current.focus()
    }
  }, [index == currentIndex])

  // autoresize textarea
  const autoResize = () => {
    if(scriptRef.current) {
      const textarea = scriptRef.current
      textarea.style.height = "5px"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    autoResize()
  }, [scriptRef.current])

  return (
    <div className={classnames(
        styles.composeSegment,
        {
          [styles.selectedSegment]: index == currentIndex
        }
      )}
      onClick={goToSegment}
    >

      <div className={styles.controls}>
        {canDeleteSegment && (
          <button
            className={styles.removeSegmentBtn}
            onClick={removeSegment}
          >
            <FontAwesomeIcon className={styles.removeSegmentBtn_icon} icon={faTrash} />
          </button>
        )}
      </div>

      <div className={styles.content}>
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
              <button onClick={removeRecording}>
                Clear
              </button>
            </>
          )}
        </div>

        <div className={styles.visual}>
          {text && (
            <TextInput
              value={text || ''}
              minSize={5}
              maxSize={5}
              readOnly
            />
          )}
        </div>
      </div>
    </div>
  )
}

ComposeSegment.propTypes = {
  index: PropTypes.number.isRequired
}

export default ComposeSegment
