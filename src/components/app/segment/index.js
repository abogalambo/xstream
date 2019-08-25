import React from 'react'
import PropTypes from 'prop-types'
import SegmentCompose from './compose'
import SegmentPlayback from './playback'

const Segment = ({
  text,
  image,
  audio,
  mode
}) => {
  if(mode == "playback") {
    return (
      <SegmentPlayback {...{text, image, audio}} />
    )
  } else {
    return (
      <SegmentCompose {...{text, image}} />
    )
  }
}

Segment.propTypes = {
  text: PropTypes.string,
  image: PropTypes.object,
  mode: PropTypes.string,
  noAudio: PropTypes.bool
}

export default Segment
