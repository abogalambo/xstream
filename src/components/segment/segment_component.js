import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TextInput from '../ui/text_input'
import styles from './segment.css'

const Segment = ({
  text,
  current,
  previous,
  next,
  onTextChange
}) => {
  return (
    <div className={classnames(
      styles.segment,
      {
        [styles.current]: current,
        [styles.previous]: previous,
        [styles.next]: next
      }
    )}>
      <TextInput
        value={text || ''}
        onChange={onTextChange}
        maxChars={200}
        prompt="Write Something .."
        disabled={!current}
      />
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
