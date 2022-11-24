// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
const fireAuth = require('firebase/auth')
//import { initializeApp } from "firebase/app";
//import { getFirestore, doc, setDoc, getDoc, addDoc, collection} from "firebase/firestore";
//import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, updateProfile  } from "firebase/auth";

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
const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firestore.getFirestore(app);

const signUp = async (email, password, firstName, lastName, role) => {
    const auth = fireAuth.getAuth();
    await fireAuth.createUserWithEmailAndPassword(auth, email, password);
    await fireAuth.updateProfile(auth.currentUser, {
        displayName: firstName + lastName
    });
    await sendVerificationEmail();
    return await createUserOnDb(email, firstName, lastName, role);
}

const logIn = async (email, password) => {
    const auth = fireAuth.getAuth();
    const userCredential = await fireAuth.signInWithEmailAndPassword(auth, email, password);
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
    const auth = fireAuth.getAuth();
    await fireAuth.signOut(auth)
}

const sendVerificationEmail = async () => {
    const auth = fireAuth.getAuth();
    await fireAuth.sendEmailVerification(auth.currentUser)
}

const createUserOnDb = async (email, firstName, lastName, role) => {
    // Add a new document in collection "users"
    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role
    }
    await firestore.setDoc(firestore.doc(db, "users", email), user);
    return user;
}

const getUser = async (email) => {
    const docRef = firestore.doc(db, "users", email);
    const docSnap = await firestore.getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw new TypeError("User not found");
    }
}

//Queries for the hike collection

const addNewHike = async (hike,collection) => {
    const staticHike = {
        ascent: hike.ascent, city: hike.city, country: hike.country, description: hike.description, difficulty: hike.difficulty, endPoint: new firestore.GeoPoint(hike.endPoint[0],hike.endPoint[1]), expectedTime: hike.expectedTime,
        length: hike.length, referencePoint: JSON.stringify(hike.referencePoint), region: hike.region, title: hike.title, startPoint: new firestore.GeoPoint(hike.startPoint[0],hike.startPoint[1])
    }
    firestore.addDoc(firestore.collection(db, collection), staticHike);
    // firestore.setDoc(firestore.doc(db,collection,hike.title),hike);
}

const deleteInvalidHikes = async () => {
    const hikesRef = firestore.collection(db, "hike");
    var q = firestore.query(hikesRef, firestore.where("ascent", '==', ''));
    var querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        firestore.deleteDoc(doc.ref);
    });
    q= firestore.query(hikesRef, firestore.where("country", '==', ''));
    querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        firestore.deleteDoc(doc.ref);
    });
    q= firestore.query(hikesRef, firestore.where("region", '==', ''));
    querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        firestore.deleteDoc(doc.ref);
    });
    q = firestore.query(hikesRef, firestore.where("city", '==', ''));
    querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        firestore.deleteDoc(doc.ref);
    });
    q = firestore.query(hikesRef, firestore.where("description", '==', ''));
    querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        firestore.deleteDoc(doc.ref);
    });
    q = firestore.query(hikesRef, firestore.where("difficulty", '==', ''));
    querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        firestore.deleteDoc(doc.ref);
    });
    q = firestore.query(hikesRef, firestore.where("expectedTime", '==', ''));
    querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        firestore.deleteDoc(doc.ref);
    });
    q = firestore.query(hikesRef, firestore.where("length", '==', ''));
    querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        firestore.deleteDoc(doc.ref);
    });
    q = firestore.query(hikesRef, firestore.where("title", '==', ''));
    querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        firestore.deleteDoc(doc.ref);
    });
}

const countryList = async () => {
    console.log("Country list.");
    const hikesRef = firestore.collection(db, "hike");
    const res = new Set();
    const querySnapshot = await firestore.getDocs(hikesRef);
    querySnapshot.forEach((doc) => {
        res.add(doc.data().country);
    });
    return Array.from(res);
}

const regionList = async (country) => {
    console.log("Region list country: ", country);
    const hikesRef = firestore.collection(db, "hike");
    const res = new Set();
    const q = firestore.query(hikesRef, firestore.where('country', '==', country));
    const querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        res.add(doc.data().region);
    });
    return Array.from(res);
}

const cityList = async (country, region) => {
    const hikesRef = firestore.collection(db, "hike");
    console.log("City list country and region: ", country, region);
    const res = new Set();
    const q = firestore.query(hikesRef, firestore.where('country', '==', country), firestore.where('region', '==', region));
    const querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        res.add(doc.data().city);
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
const hikesList = async (filters, collection) => {
    console.log("Hikes List filters: ", filters);
    const hikesRef = firestore.collection(db, collection);
    let q;
    let cont = 0;
    const names = [];
    const values = [];
    const res = [];
    if (filters.country !== undefined) {
        names.push("country");
        values.push(filters.country);
        cont++;
    }
    if (filters.region !== undefined) {
        names.push("region");
        values.push(filters.region);
        cont++;
    }
    if (filters.city !== undefined) {
        names.push("city");
        values.push(filters.city);
        cont++;
    }
    if (filters.difficulty !== undefined) {
        names.push("difficulty");
        values.push(filters.difficulty);
        cont++;
    }
    switch (cont) {
        case 1:
            console.log(cont);
            q = firestore.query(hikesRef, firestore.where(names[0], '==', values[0]));
            break;
        case 2:
            console.log(cont);
            q = firestore.query(hikesRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]));
            break;
        case 3:
            console.log(cont);
            q = firestore.query(hikesRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]), firestore.where(names[2], '==', values[2]));
            break;
        case 4:
            console.log(cont);
            q = firestore.query(hikesRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]), firestore.where(names[2], '==', values[2]));
            break;
        default:
            break;
    }
    if (cont === 0) {
        const querySnapshot = await firestore.getDocs(hikesRef);
        querySnapshot.forEach((doc) => {
            if (doc.data().expectedTime >= filters.expectedTime.min && doc.data().expectedTime <= filters.expectedTime.max && doc.data().length >= filters.length.min && doc.data().length <= filters.length.max && doc.data().ascent >= filters.ascent.min && doc.data().ascent <= filters.ascent.max) {
                res.push(doc.data());
            }
        });
    } else {
        const querySnapshot = await firestore.getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().expectedTime >= filters.expectedTime.min && doc.data().expectedTime <= filters.expectedTime.max && doc.data().length >= filters.length.min && doc.data().length <= filters.length.max && doc.data().ascent >= filters.ascent.min && doc.data().ascent <= filters.ascent.max) {
                res.push(doc.data());
            }
        });
    }
    console.log(res);
    return res;
}

const hutsList = async (filters, collection = "huts") => {
    console.log("Huts List filters: ", filters);
    const hutsRef = firestore.collection(db, collection);
    let q;
    let cont = 0;
    const names = [];
    const values = [];
    const res = [];
    if (filters.country !== undefined) {
        names.push("country");
        values.push(filters.country);
        cont++;
    }
    if (filters.region !== undefined) {
        names.push("region");
        values.push(filters.region);
        cont++;
    }
    if (filters.city !== undefined) {
        names.push("city");
        values.push(filters.city);
        cont++;
    }
    if (filters.name !== undefined) {
        names.push("name");
        values.push(filters.difficulty);
        cont++;
    }
    switch (cont) {
        case 1:
            console.log(cont);
            q = firestore.query(hutsRef, firestore.where(names[0], '==', values[0]));
            break;
        case 2:
            console.log(cont);
            q = firestore.query(hutsRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]));
            break;
        case 3:
            console.log(cont);
            q = firestore.query(hutsRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]), firestore.where(names[2], '==', values[2]));
            break;
        case 4:
            console.log(cont);
            q = firestore.query(hutsRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]), firestore.where(names[2], '==', values[2]));
            break;
        default:
            break;
    }
    if (cont === 0) {
        const querySnapshot = await firestore.getDocs(hutsRef);
        querySnapshot.forEach((doc) => {
            const hut = {
                id: doc.id,
                name: doc.data().name,
                country: doc.data().country,
                region: doc.data().region,
                city: doc.data().city, 
                position: doc.data().position,
                bedsNumber: doc.data().bedsNumber,
                description: doc.data().description
            }
            res.push(hut);
        });
    } else {
        const querySnapshot = await firestore.getDocs(q);
        querySnapshot.forEach((doc) => {
            const hut = {
                id: doc.id,
                name: doc.data().name,
                country: doc.data().country,
                region: doc.data().region,
                city: doc.data().city, 
                position: doc.data().position,
                bedsNumber: doc.data().bedsNumber,
                description: doc.data().description
            }
            res.push(hut);
        });
    }
    console.log(res);
    return res;
}

module.exports = { deleteInvalidHikes, signUp, logIn, logOut, getUser, addNewHike, countryList, regionList, cityList, hikesList, app, db, hutsList };