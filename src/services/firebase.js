// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword, getAuth, GoogleAuthProvider,
  sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup,
  signOut, updatePassword, onAuthStateChanged, updateProfile
} from 'firebase/auth'
import { getDatabase, ref, set, onValue } from 'firebase/database';

import { doc, setDoc, getFirestore, collection, arrayUnion, onSnapshot, updateDoc, deleteField } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_REACT_APP_DATABASE_URL,

  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
};


// Initialize Firebase

export class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.googleProvider = new GoogleAuthProvider();
    this.db = getFirestore(this.app)
  }

  doCreateUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  doUpdateProfile = (user , data) => {
    return updateProfile(user, data);
  };
  doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(this.auth, email, password);
  }


  doAddToFirestore(collectionName, obj) {
    const { currentUser } = this.auth;

    if (!currentUser) {
      return Promise.reject(new Error('User is not authenticated.'));
    }

    const collectionRef = collection(this.db, collectionName);
    const userDocRef = doc(collectionRef, currentUser.uid);
    return setDoc(userDocRef, { [collectionName]: arrayUnion(obj) }, { merge: true });
  }

  doGetUserDataFromFirestore = async (collectionName, onUpdate) => {
    const { currentUser } = this.auth;

    if (!currentUser || !currentUser.uid) {
      throw new Error('User is not authenticated or UID is missing.');
    }
    
    const collectionRef = collection(this.db, collectionName);
    const userDocRef = doc(collectionRef, currentUser?.uid);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        onUpdate(data); 
      }
     
    });
      return unsubscribe;

  };
  doDeleteDataFromFirestore =  (collectionName, idToDelete) => {
    const { currentUser } = this.auth;

    if (!currentUser || !currentUser.uid) {
      throw new Error('User is not authenticated or UID is missing.');
    }

    const collectionRef = collection(this.db, collectionName);
    const userDocRef = doc(collectionRef, currentUser.uid);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists()) {
       
        const data = snapshot.data();

        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(collectionName)) {
          const citiesArray = data[collectionName];

          const updatedCities = citiesArray.filter((city) => city.id !== idToDelete);

          return setDoc(userDocRef, { [collectionName]: updatedCities });



        }

      }

    });
    return unsubscribe;
      
    }  


  doSignInWithPopupGoogle = () => {
 return   signInWithPopup(this.auth, this.googleProvider);
  };

  doSignOut = () => {
    return signOut(this.auth);
  };


  
  doOnAuthStateChanged  = (callback) => {
    return onAuthStateChanged(this.auth, (currentUser) => {
      if (currentUser) {
        callback(currentUser)
      }
      else {
        callback(null)
      }

    })
  }
  



}
