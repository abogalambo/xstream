import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import { setSegmentText } from '../../../state/actions/segment'
import TextInput from '../../lib/text_input'
import styles from './segment.css'

const Segment = ({
  text
}) => {
  const dispatch = useDispatch();
  const onTextChange = (event) => {
    dispatch(setSegmentText(event.target.value))
  }

  return (
    <div className={styles.segment}>
      <div className={classnames(
        styles.mediaInput,
        {
          [styles.collapsed]: false
        }
      )}>
        <TextInput
          value={text || ''}
          onChange={onTextChange}
          maxChars={200}
          prompt="Write Something .."
        />
      </div>
      <div className={classnames(
        styles.mediaInput,
        {
          [styles.collapsed]: !!text
        }
      )}>
      </div>
    </div>
  )
}

Segment.propTypes = {
  text: PropTypes.string
}

export default Segment
