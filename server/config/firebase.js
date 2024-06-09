const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAZgUwQR0xq5DRIAcqtA38441reB0OxEfU",
  authDomain: "rentify-995fd.firebaseapp.com",
  projectId: "rentify-995fd",
  storageBucket: "rentify-995fd.appspot.com",
  messagingSenderId: "847297590904",
  appId: "1:847297590904:web:2139a5218a2a6210565f8d",
  measurementId: "G-0S6BL7MPZY",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

module.exports = { firestore, storage };
