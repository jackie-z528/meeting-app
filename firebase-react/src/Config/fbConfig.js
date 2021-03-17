import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyCY_4uMA05I1fedQySAsOB6EwOPYUVZrRA",
    authDomain: "fir-connect-e726b.firebaseapp.com",
    projectId: "fir-connect-e726b",
    storageBucket: "fir-connect-e726b.appspot.com",
    messagingSenderId: "35407786422",
    appId: "1:35407786422:web:e7af8bfee20691685f9117"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;