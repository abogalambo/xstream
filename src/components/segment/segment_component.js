import React from 'react'
import PropTypes from 'prop-types'

const Segment = ({
  text,
  current,
  previous,
  next,
  onTextChange
}) => {
  const classNames = []
  current && classNames.push('current')
  previous && classNames.push('previous')
  next && classNames.push('next')

  return (
    <div className={classNames}>
      { current ? (
        <input type="text" value={text || ''} onChange={onTextChange} />
      ) : (
        <span> {text} </span>
      )}
    </div>
  )
}

Segment.propTypes = {
  text: PropTypes.string,
  current: PropTypes.bool,
  previous: PropTypes.bool,
  next: PropTypes.bool,
  onTextChange: PropTypes.func
}

export default Segment
