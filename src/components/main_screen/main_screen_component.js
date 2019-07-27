import React from 'react'
import PropTypes from 'prop-types'
import Stream from '../stream'

const MainScreen = ({ currentStream, onNewStreamClick }) => (
  currentStream ? (
    <Stream />
  ) : (
    <button onClick={onNewStreamClick}> Add New Stream </button>
  )
)

MainScreen.propTypes = {
  currentStream: PropTypes.object,
  onNewStreamClick: PropTypes.func.isRequired
}

export default MainScreen
