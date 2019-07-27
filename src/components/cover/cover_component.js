import React from 'react'
import PropTypes from 'prop-types'

const Cover = ({ title, onTitleChange }) => (
  <div>
    <input type='text' value={title} onChange={onTitleChange} />
  </div>
)

Cover.propTypes = {
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired
}

export default Cover
