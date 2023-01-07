// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
const fireAuth = require('firebase/auth');
const dayjs = require('dayjs')
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
        hutId: user.hut || ""
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

const addNewHike = async (hike, collection = "hike") => {
    const newHike = {
        title: hike.title, country: hike.country, region: hike.region, city: hike.city, description: hike.description, difficulty: hike.difficulty, expectedTime: hike.expectedTime,
        length: hike.length, ascent: hike.ascent, startPoint: hike.startPoint, endPoint: hike.endPoint, referencePoint: JSON.stringify(hike.referencePoint), author: hike.author
    }
    firestore.addDoc(firestore.collection(db, collection), newHike);
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

const checkFilters = (filters) => {
    let cont = 0
    let names = []
    let values = []
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
    return [names, values, cont]
}

const hikesList = async (filters, collection) => {
    const hikesRef = firestore.collection(db, collection);
    let q = firestore.query(hikesRef);
    let cont = 0;
    let names = [];
    let values = [];
    let res = [];
    [names, values, cont] = checkFilters(filters)
    console.log(names)
    console.log(values)
    console.log(cont)
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
            q = firestore.query(hikesRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]), firestore.where(names[2], '==', values[2]), firestore.where(names[3], '==', values[3]));
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
        values.push(filters.name);
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
    return { id: hutID, ...(await firestore.getDoc(firestore.doc(db, collection, hutID))).data() };
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
    return { id: parkID, ...(await firestore.getDoc(firestore.doc(db, collection, parkID))).data() };
}

const modifyHike = async (hikeID, startPoint, endPoint, collection = "hike") => {
    await updateDoc(doc(db, collection, hikeID), {
        startPoint: startPoint,
        endPoint: endPoint
    });

}

const deleteHike = async (hikeId, collection = 'hike') => {
    await firestore.deleteDoc(firestore.doc(db, collection, hikeId))
}

const linkHuts = async (huts, hikeID, collection = "hike") => {
    await firestore.updateDoc(firestore.doc(db, collection, hikeID), {
        linkedHuts: huts
    });
}

//APIs for the system administrator

const getRequestingUsers = async () => {
    const userCollection = firestore.collection(db, "users")
    const reqQuery = firestore.query(userCollection, firestore.where("reqStatus", "==", "pending"))
    const querySnapshot = await firestore.getDocs(reqQuery)
    let res = []
    querySnapshot.forEach(async (doc) => {
        let user = {
            email: doc.data().email,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            role: doc.data().role,
            reqRole: doc.data().reqRole,
            hutId: doc.data().hutId ? doc.data().hutId : "",
            reqStatus: doc.data().reqStatus
        }
        if (user.hutId) {
            const hut = await firestore.getDoc(firestore.doc(db, "huts", user.hutId));
            user.hutName = await hut.data().name;
        }
        res.push(user);
    })
    return res
}

const handleRoleRequest = async (user, outcome) => {
    if (user.reqStatus !== "pending") {
        console.log("Bad request")
        return
    }
    const docData = {
        role: outcome === 'accepted' ? user.reqRole : user.role,
        respDate: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        reqStatus: outcome
    }
    if (outcome !== 'accepted' && user.hutId && user.reqRole === 'hut worker')
        docData.hutId = firestore.deleteField()
    await firestore.setDoc(firestore.doc(db, "users", user.email), docData, { merge: true })
}


const modifyUserPreferences = async (email, preferences, collection = "users") => {
    await firestore.updateDoc(firestore.doc(db, collection, email), {
        preferences: preferences
    });
}

const updateCondition = async (condition, condDetails, hikeID, collection = "hike") => {
    await firestore.updateDoc(firestore.doc(db, collection, hikeID), {
        condition: condition,
        condDetails: condDetails
    });
}

const getHikesByLinkHutWorker = async (hutID, collection = "hike") => {
    const hikesRef = firestore.collection(db, collection)
    const querySnapshot = await firestore.getDocs(hikesRef);
    const res = [];
    querySnapshot.forEach((doc) => {
        if (doc.data().linkedHuts !== undefined) {
            for (let linkedHut of doc.data().linkedHuts) {
                console.log(doc.id, " => ", linkedHut.id, hutID, linkedHut.id === hutID);

                if (linkedHut.id === hutID) {
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
                        linkedHuts: doc.data().linkedHuts,
                        condition: doc.data().condition,
                        condDetails: doc.data().condDetails
                    };
                    res.push(hike)
                }
            }
        }
    });
    console.log(res);
    return res;
}


const UpdateHikeDescription = async (title, expectedTime, difficulty, description, hikeID, collection = "hike") => {
    await firestore.updateDoc(firestore.doc(db, collection, hikeID), {
        title: title,
        expectedTime: expectedTime,
        difficulty: difficulty,
        description: description
    });
}

const getHikesByAuthor = async (author, collection = "hike") => {
    const hikesRef = firestore.collection(db, collection)
    const q = firestore.query(hikesRef, firestore.where("author", "==", author))
    const querySnapshot = await firestore.getDocs(q);
    const res = [];
    querySnapshot.forEach((doc) => {

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
            linkedHuts: doc.data().linkedHuts,
            condition: doc.data().condition,
            condDetails: doc.data().condDetails
        };
        res.push(hike)
    });
    console.log(res);
    return res;
}

const MyCompletedHikes = async (collection = 'regHikes') => {
    const regHikesref = firestore.collection(db, collection)
    const user = fireAuth.getAuth().currentUser
    const q = firestore.query(regHikesref, firestore.where("userId", "==", user.email), firestore.where("status", "==", "terminated"))
    const querySnapshot = await firestore.getDocs(q)
    const res = [];
    querySnapshot.forEach((doc) => {
        const regHike = {
            id:doc.id,            hikeId: doc.data().hikeId,
            status: doc.data().status,
            startTime: doc.data().startTime,
            endTime: doc.data().endTime,
            passedRP: doc.data().passedRP? doc.data().passedRP : undefined,
            userId: doc.data().userId
        }
        res.push(regHike)

    });
    console.log(res);
    return res;
}
//APIs for registered hikes

const startHike = async (hikeId, collection = 'regHikes') => {
    return new Promise(async (resolve, reject) => {
        const regHikesref = firestore.collection(db, collection)
        const user = fireAuth.getAuth().currentUser
        const q = firestore.query(regHikesref, firestore.where("userId", "==", user.email), firestore.where("status", "==", "ongoing"))
        const querySnapshot = await firestore.getDocs(q)
        if(!querySnapshot.empty){
            reject("You already started a hike")
            return
        }
        const regHike = {
            hikeId: hikeId,
            status: "ongoing",
            startTime: dayjs().format('DD/MM/YYYY hh:mm:ss'),
            userId: user.email
        }
        await firestore.addDoc(regHikesref, regHike)
        resolve("Hike started")
    })
}

const deleteRegHike = async (email) => {
    const regHikesref = firestore.collection(db,'regHikes')
    const q = firestore.query(regHikesref, firestore.where("userId","==",email), firestore.where("status","==","ongoing"))
    const querySnapshot = await firestore.getDocs(q)
    if(querySnapshot.empty){
        return
    }
    await firestore.deleteDoc(doc(db, "regHikes", querySnapshot.docs[0].id));
}

const terminateHike = async (regHikeId, collection = "regHikes") => {
    await firestore.updateDoc(firestore.doc(db, collection, regHikeId), {
        status: "terminated",
        endTime: dayjs().format('DD/MM/YYYY hh:mm:ss')
    });
    const user = fireAuth.getAuth().currentUser;
    const regHike = (await firestore.getDoc(firestore.doc(db, collection, regHikeId))).data();
    updateUserStats(user.email, regHike);
}

const getUserActiveHike = async (collection = "regHikes") => {
    const regHikesref = firestore.collection(db, collection);
    const user = fireAuth.getAuth().currentUser;
    const q = firestore.query(regHikesref, firestore.where("userId", "==", user.email), firestore.where("status", "==", "ongoing"));
    const querySnapshot = await firestore.getDocs(q);
    const res = [];
    querySnapshot.forEach((doc) => {
        const regHike = {
            id: doc.id,
            hikeId: doc.data().hikeId,
            status: doc.data().status,
            startTime: doc.data().startTime,
            endTime: doc.data().endTime,
            passedRP: doc.data().passedRP? doc.data().passedRP : undefined,
            userId: doc.data().userId
        }
        res.push(regHike)

    });
    console.log(res);
    return res;
}

const getHikeById = async (hikeId, collection = "hike") => {
    return { id: hikeId, ...(await firestore.getDoc(firestore.doc(db, collection, hikeId))).data() };
}

const updateRP = async (regHikeId, refPointList, collection = "regHikes") => {
    await firestore.updateDoc(firestore.doc(db, collection, regHikeId), {
        passedRP: JSON.stringify(refPointList)
    });
}

// API for performance stats

const updateUserStats = async (email, regHike, collection = 'users', hike_collection = 'hike') => {
    console.log(regHike)
    const stats = (await firestore.getDoc(firestore.doc(db, collection, email))).data().stats;
    const hike = (await firestore.getDoc(firestore.doc(db, hike_collection, regHike.hikeId))).data();
    const hike_time = dayjs(regHike.endTime).diff(dayjs(regHike.startTime), 'hour', true); //todo check format
    let refpointList = regHike.passedRP ? JSON.parse(regHike.passedRP) : [];
    refpointList = [{ time: regHike.startTime, alt: hike.startPoint.altitude }, ...refpointList, { time: regHike.endTime, alt: hike.endPoint.altitude }]
    const maxAlt = Math.max.apply(Math, refpointList.map(rp => rp.alt));
    const rangeAlt = maxAlt - Math.min.apply(Math, refpointList.map(rp => rp.alt));
    const avg = hike_time * 60 / parseFloat(hike.length) / 1000;
    let stats_new = stats ?
        { ...stats }
        :
        {
            completed_hikes: 0,
            distance: 0,
            time: 0,
            ascent: 0,
            ascending_time: 0,
            highest_altitude: 0,
            highest_altitude_range: 0,
            longest_hike_distance: 0,
            longest_hike_time: 0,
            shortest_hike_distance: Number.MAX_VALUE,
            shortest_hike_time: Number.MAX_VALUE,
            fastest_paced_hike: Number.MAX_VALUE
        };

    stats_new.completed_hikes += 1;
    stats_new.distance += parseFloat(hike.length);
    stats_new.time += hike_time;
    for (let i = 1; i < refpointList.length; i++) {
        const alt_range = refpointList[i - 1].alt && refpointList[i].alt ? refpointList[i].alt - refpointList[i - 1].alt : -1;
        if (alt_range > 0) {
            stats_new.ascent += alt_range;
            stats_new.ascending_time += dayjs(refpointList[i].time).diff(dayjs(refpointList[i - 1].time), 'hour', true);
        }
    }
    if (!stats || maxAlt > stats.highest_altitude)
        stats_new.highest_altitude = maxAlt;
    if (!stats || rangeAlt > stats.highest_altitude_range)
        stats_new.highest_altitude_range = rangeAlt;
    if (!stats || parseFloat(hike.length) > stats.longest_hike_distance)
        stats_new.longest_hike_distance = parseFloat(hike.length);
    if (!stats || parseFloat(hike.length) < stats.shortest_hike_distance)
        stats_new.shortest_hike_distance = parseFloat(hike.length);
    if (!stats || hike_time > stats.longest_hike_time)
        stats_new.longest_hike_time = hike_time;
    if (!stats || hike_time < stats.shortest_hike_time)
        stats_new.shortest_hike_time = hike_time;
    if (!stats || avg < stats.fastest_paced_hike)
        stats_new.fastest_paced_hike = avg;

    await firestore.updateDoc(firestore.doc(db, collection, email), {
        stats: stats_new
    });
}

module.exports = {
    deleteInvalidHikes, signUp, logIn, logOut, getUser, addNewHike, countryList, regionList, cityList, hikesList, app, db, createUserOnDb,
    addNewHut, deleteHike, addNewParkingLot, getAllParkingLots, hutsList, modifyHike, modifyReferencePoints, linkHuts, updateCondition, MyCompletedHikes,
    getHikesByLinkHutWorker, getHutById, getParkingLotById, modifyUserPreferences, UpdateHikeDescription, getRequestingUsers, handleRoleRequest, getHikesByAuthor,
    startHike, terminateHike, getUserActiveHike, getHikeById, updateRP, updateUserStats, deleteRegHike
};