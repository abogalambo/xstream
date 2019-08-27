import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './text_input.css'

const TextInput = ({ value, onChange, maxChars, prompt, readOnly }) => (
  <textarea
    className={classnames(styles.textDisplay, styles.textInput)}
    value={value}
    disabled={readOnly}
    {...(!readOnly && {
      onChange,
      maxLength: maxChars,
      placeholder: prompt
    })}
  />
)

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  maxChars: PropTypes.number,
  prompt: PropTypes.string,
  readOnly: PropTypes.bool
}

export default TextInput
