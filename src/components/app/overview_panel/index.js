import React from 'react'
import { useDispatch } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc'
import {
  reorderSegments
} from '../../../state/actions/stream'
import PlainOverviewPanel from './plain_overview_panel'
import styles from './overview_panel.css'

const SortableOverviewPanel = SortableContainer(PlainOverviewPanel)

const OverviewPanel = () => {
  const dispatch = useDispatch()
  const onSortEnd = ({oldIndex, newIndex}) => {
    if(oldIndex === newIndex) return
    dispatch(reorderSegments(oldIndex, newIndex))
  }

  return (
    <SortableOverviewPanel
      onSortEnd={onSortEnd}
      helperClass={styles.draggedSegment}
      distance={3}
      lockAxis={'y'}
    />
  )
}

export default OverviewPanel
