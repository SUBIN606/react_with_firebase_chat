import firebase from "firebase";

const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const database = firebase.database();
