import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { newStream, fetchStream } from '../../../state/actions/stream'
import { currentUserSelector } from '../../../state/selectors/current_user'
import { canEditCurrentStreamSelector } from '../../../state/selectors/current_stream'
import Stream from '../stream'
import Spinner from '../../lib/spinner'

const StreamLoader = ({ page }) => {
  const currentStream = useSelector(state => state.currentStream)
  const currentUser = useSelector(currentUserSelector)
  const canEditCurrentStream = useSelector(canEditCurrentStreamSelector)

  let { id } = useParams()
  let history = useHistory();

  const dispatch = useDispatch()

  useEffect(() => {
    if(currentStream == null){
      if(id){
        dispatch(fetchStream(id, page))
      } else {
        dispatch(newStream(currentUser))
      }
    }
  }, [id])

  useEffect(() => {
    if(currentStream && currentStream.id && !id){
      history.push(`/streams/${currentStream.id}/edit`)  
    }
  }, [(currentStream || {}).id])

  return currentStream ? (
    canEditCurrentStream || page == 'view' ? (
      <Stream />
    ) : (
      <div> Access denied </div>
    )
  ) : (
    <Spinner />
  )
}

StreamLoader.propTypes = {
  page: PropTypes.string
}

export default StreamLoader
