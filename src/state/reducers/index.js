import { combineReducers } from 'redux'
import currentStream from './current_stream'
import persistence from './persistence'

export default combineReducers({
  currentStream,
  persistence
})
