// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification  } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxwXhRO1caJvjh5uRHOOQ7EMJtaAIZG2E",
  authDomain: "hiketracker-585f6.firebaseapp.com",
  projectId: "hiketracker-585f6",
  storageBucket: "hiketracker-585f6.appspot.com",
  messagingSenderId: "773343738623",
  appId: "1:773343738623:web:a33524701d8bee893e2aca",
  measurementId: "G-09SB328BFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const signUp = async (email, password, firstName, lastName) => {
    const auth = getAuth();
    let userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // to do in other components
    /*.then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });*/
    
    await updateProfile(auth.currentUser, {
        displayName: firstName + lastName
    })
    /*.then(() => {
        // Profile updated!
        // ...
    }).catch((error) => {
        // An error occurred
        // ...
    });*/

    // Send verification emeil
    await sendVerificationEmail();
    /*.then(() => {
        // Email verification sent!
        // ...
    });*/

    // create a new user on firestore db
    await createUserOnDb(email, firstName, lastName)
    // to do in other components
    /*.then(() => {
        console.log("User created");
    }).catch(error => {
        // ...
    });*/

    return userCredential // or userCredential.user(?)
}

const logIn = async (email, password) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
    // to do in other components
    /*.then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });*/
}

const logOut = async () => {
    const auth = getAuth();
    await signOut(auth)
    // to do in other components
    /*.then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });*/
}

const sendVerificationEmail = async () => {
    const auth = getAuth();
    await sendEmailVerification(auth.currentUser)
}

const createUserOnDb = async (email, firstName, lastName) => {
    // Add a new document in collection "users"
    await db.collection("users").doc().set({
        firstName: firstName,
        lastName: lastName,
        email: email
    });
}

//Queries for the hike collection

const addNewHike = async (hike) =>{
    await db.collection("hikes").doc().set(hike)
}

const API = { signUp, logIn, logOut, addNewHike };
export default API;