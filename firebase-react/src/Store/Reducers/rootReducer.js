import authReducer from './authReducer'
import postReducer from './postReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export default rootReducer

