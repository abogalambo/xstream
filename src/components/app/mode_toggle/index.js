import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPen,
  faEye
} from '@fortawesome/free-solid-svg-icons'
import {
  toggleMode as toggleModeAction
} from '../../../state/actions/stream'
import {
  isPlaybackModeSelector,
  canToggleModeSelector,
  pageSelector
} from '../../../state/selectors/current_stream'
import ToggleButton from '../../lib/toggle_button'

const ModeToggle = () => {
  const isPlaybackMode = useSelector(isPlaybackModeSelector)
  const canToggleMode = useSelector(canToggleModeSelector)
  const page = useSelector(pageSelector)

  const dispatch = useDispatch()
  const toggleMode = () => dispatch(toggleModeAction())
  
  const contents = [
    {
      value: 'compose',
      text:'',
      icon: <FontAwesomeIcon icon={faPen}/>,
    },
    {
      value: 'playback',
      text:'',
      icon: <FontAwesomeIcon icon={faEye}/>,
    }
  ]

  return (page != 'view') ? (
    <ToggleButton
      contents={contents}
      onToggle={toggleMode}
      checkedValue={isPlaybackMode ? 'playback' : 'compose'}
      disabled={!canToggleMode}
    />
  ) : null
}

export default ModeToggle
