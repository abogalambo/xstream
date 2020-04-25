import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './text_input.css'

const TextInput = ({ value, minSize = 5, maxSize = 10, onChange, onFocus, onBlur, maxChars, prompt, readOnly }) => {

  const [isEditing, setIsEditing] = useState(false)

  const textAreaRef = useRef(null)

  useEffect(() => {
    const el = textAreaRef.current
    if(value != el.innerText) {
      resetText()
    }
  }, [value])

  const handleOnFocus = (e) => {
    setIsEditing(!readOnly)
    onFocus && onFocus(e)
  }

  const handleOnBlur = (e) => {
    setIsEditing(false)
    onBlur && onBlur(e)
  }

  const handleOnClick = () => {
    setIsEditing(!readOnly)
  }

  const handleInput = (e) => {
    const el = e.target
    const newValue = el.innerText

    if(newValue.length > maxChars) {
      resetText()
    } else {
      onChange(newValue)
    }
  }

  const resetText = () => {
    const el = textAreaRef.current
    el.innerText = value

    const range = document.createRange()
    const sel = window.getSelection()
    range.setStart(el, el.childNodes.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  return (
    <div className={styles.wrapper}>
      {!isEditing && !value && (
        <div className={styles.prompt}>{prompt}</div>
      )}

      <div
        className={classnames(
          styles.textDisplay,
          styles.textInput,
          {
            [styles.empty]: !value && isEditing            
          }
        )}
        onClick={handleOnClick}
        ref={textAreaRef}
        contentEditable={!readOnly}
        style={fontStyle(value, minSize, maxSize, maxChars)}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        maxLength={maxChars}
        placeholder={prompt}
        onInput={handleInput}
      />

      {isEditing && (
        <span>{maxChars - (value || "").length}</span>
      )}
    </div>
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
