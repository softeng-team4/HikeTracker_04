// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, addDoc, collection} from "firebase/firestore";
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
        throw new TypeError("User not found");
    }
}

//Queries for the hike collection

const addNewHike = async (hike) =>{
    addDoc(collection(db,"hike"),hike).catch(console.log("Insertion error"));
}

const countryList = async () =>{
    console.log("Country list.");
    const hikesRef = collection(db, "hike");
    const res = new Set();
    const querySnapshot = await getDocs(hikesRef);
    querySnapshot.forEach((doc)=>{
        res.add(doc.data().Country);
    });
    return Array.from(res);
}

const regionList = async (country) =>{
    console.log("Region list country: ", country);
    const hikesRef = collection(db, "hike");
    const res = new Set();
    const q = query(hikesRef, where('Country', '==', country));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
        res.add(doc.data().Region);
    });
    return Array.from(res);
}

const cityList = async (country, region) =>{
    const hikesRef = collection(db, "hike");
    console.log("City list country and region: ", country, region);
    const res = new Set();
    const q = query(hikesRef, where('Country', '==', country), where('Region', '==', region));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
        res.add(doc.data().City);
    });
    return Array.from(res);
}

//filters example
//const filter1 = {country: undefined, 
//  region:undefined, 
//  city: undefined, 
//  difficulty: undefined, 
//  ascent:{min: 0, max: 8000}, 
//  length:{min:0,max:8000},
//  expectedTime:{min:0,max:24}
//}
const hikesList = async (filters) =>{
    console.log("Hikes List filters: ",filters);
    const hikesRef = collection(db, "hike");
    let q;
    let cont = 0;
    const names = [];
    const values = [];
    const res = [];
    if(filters.country !== undefined){
        names.push("Country");
        values.push(filters.country);
        cont ++;
    }
    if(filters.region !== undefined){
        names.push("Region");
        values.push(filters.region);
        cont ++;
    }
    if(filters.city !== undefined){
        names.push("City");
        values.push(filters.city);
        cont ++;
    }
    if(filters.difficulty !== undefined){
        names.push("Difficulty");
        values.push(filters.difficulty);
        cont ++;
    }
    switch (cont){
        case 1:
            console.log(cont);
            q = query(hikesRef, where(names[0], '==', values[0]));
            break;
        case 2:
            console.log(cont);
            q = query(hikesRef, where(names[0], '==', values[0]), where(names[1], '==', values[1]));
            break;
        case 3:
            console.log(cont);
            q = query(hikesRef, where(names[0], '==', values[0]), where(names[1], '==', values[1]), where(names[2], '==', values[2]));
            break;
        case 4:
            console.log(cont);
            q = query(hikesRef, where(names[0], '==', values[0]), where(names[1], '==', values[1]), where(names[2], '==', values[2]));
            break;
        default:
            break;
    }
    if(cont === 0){
        const querySnapshot = await getDocs(hikesRef);
        querySnapshot.forEach((doc)=>{
            if(doc.data().Expected_time>=filters.expectedTime.min && doc.data().Expected_time<=filters.expectedTime.max && doc.data().Length>=filters.length.min && doc.data().Length<=filters.length.max && doc.data().Ascent>=filters.ascent.min && doc.data().Ascent<=filters.ascent.max){
                res.push(doc.data());
            }
        });
    }else{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            if(doc.data().Expected_time>=filters.expectedTime.min && doc.data().Expected_time<=filters.expectedTime.max && doc.data().Length>=filters.length.min && doc.data().Length<=filters.length.max && doc.data().Ascent>=filters.ascent.min && doc.data().Ascent<=filters.ascent.max){
                res.push(doc.data());
            }
        });
    }
    return res;
}

const API = { signUp, logIn, logOut, getUser, addNewHike, countryList, regionList, cityList, hikesList };
export default API;