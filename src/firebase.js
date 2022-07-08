// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBttJrFTe-rFVX5e_K8SRx3Lxmp3PgXG1k",
    authDomain: "clone-33407.firebaseapp.com",
    projectId: "clone-33407",
    storageBucket: "clone-33407.appspot.com",
    messagingSenderId: "1021736458995",
    appId: "1:1021736458995:web:5d312718aa9ef2e4fdb586",
    measurementId: "G-8WB0SJF9XE"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export{db, auth, storage};