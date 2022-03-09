import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDPJnVVTwICHVYDYliRztN2iNq-a2dW-jU",
  authDomain: "whatsapp-clone-7424d.firebaseapp.com",
  projectId: "whatsapp-clone-7424d",
  storageBucket: "whatsapp-clone-7424d.appspot.com",
  messagingSenderId: "43324698285",
  appId: "1:43324698285:web:320f9521c1d1f7be8be024",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };