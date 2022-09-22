import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBK6JQFhcCDyweyZWeEN3ZNA74FqjxD4Lo",
  authDomain: "meeting-app-de39c.firebaseapp.com",
  projectId: "meeting-app-de39c",
  storageBucket: "meeting-app-de39c.appspot.com",
  messagingSenderId: "337515599525",
  appId: "1:337515599525:web:03592486c9faa035e31f4c",
  measurementId: "G-SK1VW5LV57"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;
