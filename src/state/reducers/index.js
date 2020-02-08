import { combineReducers } from 'redux'
import currentStream from './current_stream'
import persistence from './persistence'
import confirmation from './confirmation'
import currentStreamList from './current_stream_list'

export default combineReducers({
  currentStream,
  persistence,
  confirmation,
  currentStreamList
})
