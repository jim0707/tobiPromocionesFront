import { combineReducers } from 'redux'
import {correoReducer} from './correoReducer'
import {cuponReducer} from './cuponReducer'

export default combineReducers({
    correoReducer:correoReducer,
    cuponReducer: cuponReducer
})