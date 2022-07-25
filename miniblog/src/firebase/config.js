
import { initializeApp } from "firebase/app";
import {getFireStore} from "firebase/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC8_UC0A967xsNOXb-vRSoZRRNa4n6BjB0",
  authDomain: "miniblog-eb1be.firebaseapp.com",
  projectId: "miniblog-eb1be",
  storageBucket: "miniblog-eb1be.appspot.com",
  messagingSenderId: "784349583530",
  appId: "1:784349583530:web:93bae5f53c8f52524918d3"
};


const app = initializeApp(firebaseConfig);

const db = getFireStore(app)

export {db};