import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  currentSegmentDataSelector
} from '../../../state/selectors/current_stream'
import {
  pauseStream
} from '../../../state/actions/playback'
import TextInput from '../../lib/text_input'
import SegmentImage from '../segment_image'
import ClosedCaption from '../closed_caption'
import PlaybackPlayer from '../playback_player'
import styles from './segment.css'
import config from '../../../../config'

const Segment = () => {
  const { text, image } = useSelector(currentSegmentDataSelector)

  const dispatch = useDispatch();

  const onLinkClick = () => {
    dispatch(pauseStream())
  }

  return (
    <PlaybackPlayer>
      <div className={styles.segment}>
        {text && (
          <TextInput
            value={text}
            minSize={5}
            maxSize={5}
            onLinkClick={onLinkClick}
            maxChars={config.stream.text.maxLength}
            readOnly
          />
        )}

        {image && (
          <SegmentImage image={image} />
        )}
        
        <ClosedCaption />
      </div>
    </PlaybackPlayer>
  )
}

export default Segment
