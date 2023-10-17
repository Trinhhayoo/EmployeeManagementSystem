// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase,ref,get} from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "employee-management-syst-4d485.firebaseapp.com",
  databaseURL: "https://employee-management-syst-4d485-default-rtdb.firebaseio.com",
  projectId: "employee-management-syst-4d485",
  storageBucket: "employee-management-syst-4d485.appspot.com",
  messagingSenderId: "308086070979",
  appId: "1:308086070979:web:ef6eba24ee8a17f1468c76",
  measurementId: "G-G973WPP3QW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app);

export {
  app,
  database,
  storage
};
