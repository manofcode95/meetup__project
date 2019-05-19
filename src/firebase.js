import * as firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyCc2F7TC1aR0gZp2Z81fOENKeI7n_wEFZk',
  authDomain: 'meetup-8d998.firebaseapp.com',
  databaseURL: 'https://meetup-8d998.firebaseio.com',
  projectId: 'meetup-8d998',
  storageBucket: 'meetup-8d998.appspot.com',
  messagingSenderId: '11359002167',
  appId: '1:11359002167:web:14edfa747aed3460'
});
var db = firebase.firestore();
export default db;
