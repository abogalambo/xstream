import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from '../state/reducers'
import { createStore, applyMiddleware, compose } from 'redux'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer, /* preloadedState, */
  composeEnhancers(
    applyMiddleware(
      thunk,
      promise
    )
  )
)

export default store