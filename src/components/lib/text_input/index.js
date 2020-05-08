import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import urlRegex from 'url-regex'
import styles from './text_input.css'

window.urlRegex = urlRegex

const TextInput = ({ value, minSize = 5, maxSize = 10, onChange, onFocus, onBlur, maxChars, prompt, readOnly }) => {

  const [isEditing, setIsEditing] = useState(false)

  const textAreaRef = useRef(null)

  useEffect(() => {
    const el = textAreaRef.current
    if(el) {
      if(value != el.innerText) {
        resetText()
      }
      el.focus()
    }
  }, [value, isEditing])

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
    const newValue = el.innerText.trim()

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

  const convertLinks = () => {
    const regex = urlRegex({strict: false})

    let text = value
    let done = false
    let nodes = []
    let index = 0

    while(!done) {
      const matches = text.match(regex) || []

      if(matches.length > 0) {
        const match = matches[0]
        const prefix = text.split(regex)[0]
        if(prefix.length > 0) {
          nodes.push(prefix)
        }

        const url = match.toLowerCase().startsWith("http") ? match : `//${match}`

        nodes.push(
          <a href={url}
            className={styles.inlineLink}
            key={`link_${index}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {match}
          </a>
        )
        index++

        const matchIndex = text.search(regex)
        text = text.slice(matchIndex + match.length, text.length)


      } else {
        nodes.push(text)
        done = true
      }
    }

    return nodes.reduce((acc, node) => {
      if(typeof node == "string") {
        node.split("\n").forEach((str, idx, arr) => {
          if(str.length > 0) {
            acc.push(str)
          }
          if(arr[idx + 1]) {
            acc.push(<br key={`br_${index}`} />)
          }
          index++
        })
      }else {
        acc.push(node)
      }

      return acc
    }, [])
  }

  return (
    <div
      className={styles.wrapper}
      onClick={handleOnClick}
    >
      {!isEditing && !value && (
        <div className={styles.prompt}>{prompt}</div>
      )}

      {!isEditing && (
        <div
          className={classnames(styles.textDisplay)}
          style={fontStyle(value, minSize, maxSize, maxChars)}
        >
          { convertLinks(value) }
        </div>
      )}

      {isEditing && (
        <div
          className={classnames(
            styles.textDisplay,
            styles.textInput
          )}
          ref={textAreaRef}
          contentEditable
          style={fontStyle(value, minSize, maxSize, maxChars)}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onInput={handleInput}
        />
      )}

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
