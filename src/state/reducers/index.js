import { combineReducers } from 'redux'
import currentStream from './current_stream'
import persistence from './persistence'
import confirmation from './confirmation'

export default combineReducers({
  currentStream,
  persistence,
  confirmation
})
