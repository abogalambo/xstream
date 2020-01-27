import React from 'react'
import { useSelector } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'
import PropTypes from 'prop-types'
import {
  isPlaybackModeSelector
} from '../../../state/selectors/current_stream'
import PlainSegmentOverview from '../segment_overview'

const SortableSegmentOverview = SortableElement(PlainSegmentOverview)

const SegmentOverview = (props) => {
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const { index, ...plainProps } = props

  return isPlaybackMode ? (
    <PlainSegmentOverview {...plainProps} />
  ) : (
    <SortableSegmentOverview {...props} />
  )
}

SegmentOverview.propTypes = {
  index: PropTypes.number
}

export default SegmentOverview
