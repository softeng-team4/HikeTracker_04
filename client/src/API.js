// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
const fireAuth = require('firebase/auth');
const { GeoPoint, updateDoc, doc } = require('firebase/firestore');
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

const signUp = async (user, password) => {
    const auth = fireAuth.getAuth();
    await fireAuth.createUserWithEmailAndPassword(auth, user.email, password);
    await fireAuth.updateProfile(auth.currentUser, {
        displayName: user.firstName + user.lastName
    });
    await sendVerificationEmail();
    return await createUserOnDb(user);
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

const createUserOnDb = async (user) => {
    console.log(user.phoneNumber);
    // Add a new document in collection "users"
    const obj = {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        role: user.role,
        reqRole: user.reqRole || "",
        reqStatus: user.reqStatus || "",
        respDate: user.respDate || "",
        hut: user.hut || ""
    };
    await firestore.setDoc(firestore.doc(db, "users", user.email), obj);
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


const addNewHike = async (ascent, city, country, description, difficulty, endPoint, expectedTime,
    length, referencePoint, region, title, startPoint, author) => {
    const hike = {
        title: title, country: country, region: region, city: city, description: description, difficulty: difficulty, expectedTime: expectedTime,
        length: length, ascent: ascent, startPoint: startPoint, endPoint: endPoint, referencePoint: JSON.stringify(referencePoint), author: author
    }
    firestore.addDoc(firestore.collection(db, "hike"), hike);
    // firestore.setDoc(firestore.doc(db,collection,hike.title),hike);
}

const deleteInvalidHikes = async () => {
    const hikesRef = firestore.collection(db, "hike");
    let q = firestore.query(hikesRef, firestore.where("ascent", '==', ''));
    let querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        firestore.deleteDoc(doc.ref);
    });
    q = firestore.query(hikesRef, firestore.where("country", '==', ''));
    querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        firestore.deleteDoc(doc.ref);
    });
    q = firestore.query(hikesRef, firestore.where("region", '==', ''));
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
    const hikesRef = firestore.collection(db, "hike");
    const res = new Set();
    const querySnapshot = await firestore.getDocs(hikesRef);
    querySnapshot.forEach((doc) => {
        res.add(doc.data().country);
    });
    return Array.from(res);
}

const regionList = async (country) => {
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
    const res = new Set();
    const q = firestore.query(hikesRef, firestore.where('country', '==', country), firestore.where('region', '==', region));
    const querySnapshot = await firestore.getDocs(q);
    querySnapshot.forEach((doc) => {
        res.add(doc.data().city);
    });
    return Array.from(res);
}

//Spherical law of cosines distance
function distance(lat1, lon1, lat2, lon2) {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        const R = 6371e3;
        const p1 = lat1 * Math.PI / 180;
        const p2 = lat2 * Math.PI / 180;
        const deltaP = p2 - p1;
        const deltaLon = lon2 - lon1;
        const deltaLambda = (deltaLon * Math.PI) / 180;
        const a = Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
            Math.cos(p1) * Math.cos(p2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
        const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R;
        return d;
    }
}

const hikesList = async (filters, collection) => {
    const hikesRef = firestore.collection(db, collection);
    let q = firestore.query(hikesRef);
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
            q = firestore.query(hikesRef, firestore.where(names[0], '==', values[0]));
            break;
        case 2:
            q = firestore.query(hikesRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]));
            break;
        case 3:
            q = firestore.query(hikesRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]), firestore.where(names[2], '==', values[2]));
            break;
        case 4:
            q = firestore.query(hikesRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]), firestore.where(names[2], '==', values[2]));
            break;
        default:
            break;
    }
        const querySnapshot = await firestore.getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().expectedTime >= filters.expectedTime.min && doc.data().expectedTime <= filters.expectedTime.max && doc.data().length >= filters.length.min && doc.data().length <= filters.length.max && doc.data().ascent >= filters.ascent.min && doc.data().ascent <= filters.ascent.max) {
                if (filters.pointRadius.radius !== undefined) {
                        const dist = distance(filters.pointRadius.coordinates[0], filters.pointRadius.coordinates[1], doc.data().startPoint.latitude, doc.data().startPoint.longitude);
                        if (dist <= filters.pointRadius.radius) {
                            const hike = {
                                id: doc.id,
                                ascent: doc.data().ascent,
                                city: doc.data().city,
                                country: doc.data().country,
                                description: doc.data().description,
                                difficulty: doc.data().difficulty,
                                endPoint: doc.data().endPoint,
                                expectedTime: doc.data().expectedTime,
                                length: doc.data().length,
                                referencePoint: doc.data().referencePoint,
                                region: doc.data().region,
                                title: doc.data().title,
                                startPoint: doc.data().startPoint,
                                author: doc.data().author,
                                linkedHuts: doc.data().linkedHuts
                            };
                            res.push(hike);
                        }
                } else {
                    const hike = {
                        id: doc.id,
                        ascent: doc.data().ascent,
                        city: doc.data().city,
                        country: doc.data().country,
                        description: doc.data().description,
                        difficulty: doc.data().difficulty,
                        endPoint: doc.data().endPoint,
                        expectedTime: doc.data().expectedTime,
                        length: doc.data().length,
                        referencePoint: doc.data().referencePoint,
                        region: doc.data().region,
                        title: doc.data().title,
                        startPoint: doc.data().startPoint,
                        author: doc.data().author,
                        linkedHuts: doc.data().linkedHuts
                    };
                    res.push(hike);
                }
            }
        });
    return res;
}


const hutsList = async (filters, collection = "huts") => {
    const hutsRef = firestore.collection(db, collection);
    let q = firestore.query(hutsRef);
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
            q = firestore.query(hutsRef, firestore.where(names[0], '==', values[0]));
            break;
        case 2:
            q = firestore.query(hutsRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]));
            break;
        case 3:
            q = firestore.query(hutsRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]), firestore.where(names[2], '==', values[2]));
            break;
        case 4:
            q = firestore.query(hutsRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]), firestore.where(names[2], '==', values[2]));
            break;
        default:
            break;
    }
        const querySnapshot = await firestore.getDocs(q);
        querySnapshot.forEach((doc) => {
            const hut = {
                id: doc.id,
                name: doc.data().name,
                phone: doc.data().phone,
                email: doc.data().email,
                website: doc.data().website,
                altitude: doc.data().altitude,
                country: doc.data().country,
                region: doc.data().region,
                city: doc.data().city,
                position: doc.data().position,
                bedsNumber: doc.data().bedsNumber,
                description: doc.data().description,
                costPerNight: doc.data().costPerNight,
                openingHour: doc.data().openingHour,
                openingMinute: doc.data().openingMinute,
                closingHour: doc.data().closingHour,
                closingMinute: doc.data().closingMinute
            }
            res.push(hut);
        });
    return res;
}

const getHutById = async (hutID, collection = 'huts') => {
    return {id: hutID, ...(await firestore.getDoc(firestore.doc(db, collection, hutID))).data()};
}

const addNewHut = async (hut, collection = "huts") => {
    const hutsRef = firestore.collection(db, collection);
    const obj = {
        name: hut.name,
        email: hut.email,
        phone: hut.phone,
        website: hut.website,
        altitude: hut.altitude,
        country: hut.country,
        region: hut.region,
        city: hut.city,
        position: new GeoPoint(hut.position[0], hut.position[1]),
        bedsNumber: hut.bedsNumber,
        costPerNight: hut.costPerNight,
        description: hut.description,
        openingHour: hut.openingHour,
        openingMinute: hut.openingMinute,
        closingHour: hut.closingHour,
        closingMinute: hut.closingMinute
    }
    await firestore.addDoc(hutsRef, obj);
    // firestore.setDoc(firestore.doc(db,collection,hike.title),hike);
}

const addNewParkingLot = async (parkingLot, collection = "parkingLots") => {
    const parkingLotsRef = firestore.collection(db, collection);
    const obj = {
        name: parkingLot.name,
        country: parkingLot.country,
        region: parkingLot.region,
        city: parkingLot.city,
        position: new GeoPoint(parkingLot.position[0], parkingLot.position[1]),
        lotsNumber: parkingLot.lotsNumber,
        costPerDay: parkingLot.costPerDay,
        description: parkingLot.description,
        openingHour: parkingLot.openingHour,
        openingMinute: parkingLot.openingMinute,
        closingHour: parkingLot.closingHour,
        closingMinute: parkingLot.closingMinute
    }
    await firestore.addDoc(parkingLotsRef, obj);
    // firestore.setDoc(firestore.doc(db,collection,hike.title),hike);
}

const modifyReferencePoints = async (hike, referencePoints, collection = "hike") => {
    const oldRefPoints = JSON.parse(hike.referencePoint);
    const newRefPoints = oldRefPoints.map(orp => {
        let name = "";
        for (const nrp of referencePoints) {
            if (orp.lat === nrp.lat && orp.lng === nrp.lng) {
                name = nrp.name;
                break;
            }
        }
        if (name !== "") {
            return { name: name, lat: orp.lat, lng: orp.lng };
        }
        return orp;
    });

    const docRef = doc(db, collection, hike.id);
    await updateDoc(docRef, {
        referencePoint: JSON.stringify(newRefPoints)
    });
}

const getAllParkingLots = async (collection = "parkingLots") => {
    const parkingLotsRef = firestore.collection(db, collection)
    const querySnapshot = await firestore.getDocs(parkingLotsRef);
    const res = [];
    querySnapshot.forEach((doc) => {
        const obj = {
            id: doc.id,
            name: doc.data().name,
            country: doc.data().country,
            region: doc.data().region,
            city: doc.data().city,
            position: doc.data().position,
            lotsNumber: doc.data().lotsNumber,
            costPerDay: doc.data().costPerDay,
            description: doc.data().description,
            openingHour: doc.data().openingHour,
            openingMinute: doc.data().openingMinute,
            closingHour: doc.data().closingHour,
            closingMinute: doc.data().closingMinute
        }
        res.push(obj)
    });
    return res;
}

const getParkingLotById = async (parkID, collection = 'parkingLots') => {
    return {id: parkID, ...(await firestore.getDoc(firestore.doc(db, collection, parkID))).data()};
}

const modifyHike = async (hikeID, startPoint, endPoint, collection="hike") => {
    await updateDoc(doc(db, collection, hikeID), {
        startPoint: startPoint,
        endPoint: endPoint
    });
    
}

const linkHuts = async(huts, hikeID, collection = "hike") => {
    await firestore.updateDoc(firestore.doc(db, collection, hikeID),{
        linkedHuts: huts
    });
}

const modifyUserPreferences = async (email, preferences, collection = "users") => {
    await firestore.updateDoc(firestore.doc(db, collection, email), {
        preferences: preferences
    });
}

module.exports = { deleteInvalidHikes, signUp, logIn, logOut, getUser, addNewHike, countryList, regionList, cityList, hikesList, app, db, addNewHut, addNewParkingLot, getAllParkingLots, hutsList, modifyHike,  modifyReferencePoints, linkHuts, getHutById, getParkingLotById, modifyUserPreferences };
