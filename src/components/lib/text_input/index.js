import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './text_input.css'

const TextInput = ({ value, minSize = 5, maxSize = 10, onChange, onFocus, onBlur, maxChars, prompt, readOnly }) => {

  const [isEditing, setIsEditing] = useState(false)

  const textAreaRef = useRef(null)

  useEffect(() => {
    const el = textAreaRef.current
    if(isEditing && el) {
      el.focus()
      el.setSelectionRange(el.value.length, el.value.length)
    }
  }, [isEditing])

  const handleOnFocus = (e) => {
    setIsEditing(true)
    onFocus && onFocus(e)
  }

  const handleOnBlur = (e) => {
    setIsEditing(false)
    onBlur && onBlur(e)
  }

  const handleOnClick = () => {
    setIsEditing(true)
  }

  const hideTextArea = !isEditing && value

  return (
    <>
      {(readOnly || hideTextArea) && (
        <div
          className={styles.textDisplay}
          style={fontStyle(value, minSize, maxSize, maxChars)}
          onClick={handleOnClick}
        >
          {value}
        </div>
      )}

      {!readOnly && (
        <div>
          <textarea
            className={classnames(
              styles.textDisplay,
              styles.textInput,
              {
                [styles.editing]: value && isEditing,
                [styles.hidden]: hideTextArea
              }
            )}
            ref={textAreaRef}
            value={value}
            disabled={readOnly}
            wrap="hard"
            style={fontStyle(value, minSize, maxSize, maxChars)}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            maxLength={maxChars}
            placeholder={prompt}
            onChange={onChange}
          />
          {isEditing && (
            <span>{maxChars - (value || "").length}</span>
          )}
        </div>
      )}
    </>
  )
}

const fontStyle = (value, minSize, maxSize, maxChars) => {
  const size = maxSize - ((maxSize - minSize) * value.length / maxChars)

  return { fontSize: `${size}vmin` }
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  maxChars: PropTypes.number,
  prompt: PropTypes.string,
  readOnly: PropTypes.bool
}

export default TextInput
