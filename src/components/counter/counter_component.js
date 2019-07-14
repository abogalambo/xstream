import React from 'react'
import PropTypes from 'prop-types'

const Counter = ({ count, onIncrementClick, onDecrementClick, }) => (
  <div>
    <button onClick={onDecrementClick}> ⌄ </button>
    <span> { count } </span>
    <button onClick={onIncrementClick}> ˄ </button>
  </div>
)

Counter.propTypes = {
  onIncrementClick: PropTypes.func.isRequired,
  onDecrementClick: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired
}

export default Counter
