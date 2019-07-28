import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './text_input.css'

const TextInput = ({ value, onChange, maxChars, prompt, autoFocus, disabled }) => (
  <textarea
    className={classnames(styles.textDisplay, styles.textInput)}
    value={value}
    onChange={onChange}
    maxLength={maxChars}
    placeholder={prompt}
    autoFocus={autoFocus}
    disabled={disabled}
  />  
)

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  maxChars: PropTypes.number,
  prompt: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool
}

export default TextInput
