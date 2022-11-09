// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, updateProfile  } from "firebase/auth";

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

const signUp = async (email, password, firstName, lastName, role) => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
        displayName: firstName + lastName
    });
    await sendVerificationEmail();
    return await createUserOnDb(email, firstName, lastName, role);
}

const logIn = async (email, password) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const emailVerified = userCredential.user.emailVerified;
    console.log(emailVerified);
    if (emailVerified) {
        return await getUser(email);
    } else {
        sendVerificationEmail();
        logOut();
        throw new TypeError("Email not verified!");
    }
}

const logOut = async () => {
    const auth = getAuth();
    await signOut(auth)
}

const sendVerificationEmail = async () => {
    const auth = getAuth();
    await sendEmailVerification(auth.currentUser)
}

const createUserOnDb = async (email, firstName, lastName, role) => {
    // Add a new document in collection "users"
    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role
    }
    await setDoc(doc(db, "users", email), user);
    return user;
}

const getUser = async (email) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw new new TypeError("User not found");
    }
}

const API = { signUp, logIn, logOut };
export default API;