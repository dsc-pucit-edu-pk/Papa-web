// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4cT_VOF9hR0GTWKj5DAVBdCjZV7KUQzs",
  authDomain: "pucon-cd896.firebaseapp.com",
  projectId: "pucon-cd896",
  storageBucket: "pucon-cd896.appspot.com",
  messagingSenderId: "393854585316",
  appId: "1:393854585316:web:c221f1d4270fc02fb81ff1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage, app as default };
