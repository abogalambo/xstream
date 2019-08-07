import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { newStream } from '../../state/actions/stream'
import Stream from '../stream'

const MainScreen = () => {
  const currentStream = useSelector(state => state.currentStream);
  const dispatch = useDispatch();
  const onNewStreamClick = () => dispatch(newStream())

  return (
    currentStream ? (
      <Stream />
    ) : (
      <button onClick={onNewStreamClick}> Add New Stream </button>
    )
  )
}

export default MainScreen
