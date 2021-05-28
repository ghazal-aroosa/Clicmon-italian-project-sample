import "firebase/firestore";
import "firebase/storage";

import firebase from "firebase/app";

export var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBManGWroQQFzoK32HVA9hsWsuu4NT-JUc",
  authDomain: "clicmondemo.firebaseapp.com",
  projectId: "clicmondemo",
  storageBucket: "clicmondemo.appspot.com",
  messagingSenderId: "809513704334",
  appId: "1:809513704334:web:490eae567bcfd7315e22df",
});
var db = firebaseApp.firestore();

export { db };
