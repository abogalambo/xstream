import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import classnames from 'classnames'
import { setSegmentText } from '../../state/actions/segment'
import TextInput from '../ui/text_input'
import styles from './segment.css'

const Segment = ({
  text,
  current,
  previous,
  next
}) => {
  const dispatch = useDispatch();
  const onTextChange = (event) => {
    current && dispatch(setSegmentText(event.target.value))
  }

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
  next: PropTypes.bool
}

export default Segment
