import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reduxThunk from 'redux-thunk'
import Reducers from './reducers'

export default createStore(Reducers, composeWithDevTools(applyMiddleware(reduxThunk)))
