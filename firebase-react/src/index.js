import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './Store/Reducers/rootReducer';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded} from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import firebase from './Config/fbConfig'

const rrfConfig ={
  userProfile:'users',
  useFirestoreForProfile:true,
  attachAuthIsReady:true,
}

const store = createStore(rootReducer,
  compose(applyMiddleware(thunk.withExtraArgument({getFirebase}))
));


const rrfProps={
  firebase,
  config:rrfConfig,
  dispatch:store.dispatch,
  createFirestoreInstance
}

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>splash screen...</div>;
  return children
}

ReactDOM.render(
  <Provider store = { store }>
    <ReactReduxFirebaseProvider {...rrfProps}>
    <AuthIsLoaded>
          <App />
    </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
