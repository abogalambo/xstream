import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../../lib/text_input'
import styles from './cover.css'

const Cover = ({ title, onTitleChange }) => (
  <div className={styles.cover}>
    <TextInput
      value={title}
      onChange={onTitleChange}
      maxChars={40}
      prompt="Add Title .."
    />
  </div>
)

Cover.propTypes = {
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired
}

export default Cover
