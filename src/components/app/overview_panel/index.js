import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc'
import {
  reorderSegments
} from '../../../state/actions/stream'
import {
  isPlaybackModeSelector,
} from '../../../state/selectors/current_stream'
import PlainOverviewPanel from './plain_overview_panel'
import styles from './overview_panel.css'

const SortableOverviewPanel = SortableContainer(PlainOverviewPanel)

const OverviewPanel = () => {
  const dispatch = useDispatch()
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const onSortEnd = ({oldIndex, newIndex}) => {
    if(oldIndex === newIndex) return
    dispatch(reorderSegments(oldIndex, newIndex))
  }

  return isPlaybackMode ? (
    <PlainOverviewPanel />
  ) : (
    <SortableOverviewPanel
      onSortEnd={onSortEnd}
      helperClass={styles.draggedSegment}
      distance={3}
      lockAxis={'y'}
    />
  )
}

export default OverviewPanel
