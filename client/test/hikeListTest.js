'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();


// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
//import { initializeApp } from "firebase/app";
//import { getFirestore, doc, query, collection, getDocs, deleteDoc, documentId, getDoc} from "firebase/firestore";
//import {addNewHike} from "../src/API"

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
const testHikes = firestore.collection(db,"hike-test")

describe('testing the definition of a new hike by a local guide',()=>{

    before(async ()=>{

        const hikeQuery = firestore.query(testHikes);
        const querySnapshot = await firestore.getDocs(hikeQuery)
        querySnapshot.forEach(async (doc) =>{
            await firestore.deleteDoc(firestore.doc(db,"hike-test",doc.id))
        })

        await firestore.setDoc(firestore.doc(testHikes, "1"), {
            Ascent: 10, City: "Turin", Country: "Italy", Expected_time: 5.3, Lenght: 1000,
            Region: "Piemonte", Difficulty: "Tourist", Title:"Hikes 1"});
        await firestore.setDoc(firestore.doc(testHikes, "2"), {
            Ascent: 11, City: "Turin", Country: "Italy", Expected_time: 2.6, Lenght: 3000,
            Region: "Piemonte", Difficulty: "Pro", Title:"Hikes 2"});
        await firestore.setDoc(firestore.doc(testHikes, "3"), {
            Ascent: 21, City: "Turin", Country: "Italy", Expected_time: 5.1, Lenght: 2800,
            Region: "Piemonte", Difficulty: "Tourist", Title:"Hikes 3"});
        await firestore.setDoc(firestore.doc(testHikes, "4"), {
            Ascent: 24, City: "Turin", Country: "Italy", Expected_time: 3.4, Lenght: 1500,
            Region: "Piemonte", Difficulty: "Pro", Title:"Hikes 4"});
        await firestore.setDoc(firestore.doc(testHikes, "5"), {
            Ascent: 16, City: "Milan", Country: "Italy", Expected_time: 2.5, Lenght: 1800,
            Region: "Lombardia", Difficulty: "Tourist", Title:"Hikes 5"});
        await firestore.setDoc(firestore.doc(testHikes, "6"), {
            Ascent: 17, City: "Milan", Country: "Italy", Expected_time: 9.5, Lenght: 4000,
            Region: "Lombardia", Difficulty: "Pro", Title:"Hikes 6"});
        await firestore.setDoc(firestore.doc(testHikes, "7"), {
            Ascent: 28, City: "Milan", Country: "Italy", Expected_time: 4.1, Lenght: 4200,
            Region: "Lombardia", Difficulty: "Pro", Title:"Hikes 7"});
        await firestore.setDoc(firestore.doc(testHikes, "8"), {
            Ascent: 19, City: "Milan", Country: "Italy", Expected_time: 4.5, Lenght: 800,
            Region: "Lombardia", Difficulty: "Tourist", Title:"Hikes 8"});

    })

    const filter1 = {country: undefined, region:undefined, city: undefined, difficulty: undefined, ascent:{min: 0, max: 8000}, lenght:{min:0,max:8000},expectedTime:{min:0,max:24}}

    testHikeList(filter1);
})

const hikesList = async (filters) =>{
    const hikesRef = firestore.collection(db, "hike-test");
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
            q = firestore.query(hikesRef, firestore.where(names[0], '==', values[0]));
            break;
        case 2:
            console.log(cont);
            q = firestore.query(hikesRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]));
            break
case 3:
            console.log(cont);
            q = firestore.query(hikesRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]));
            break;
        case 4:
            console.log(cont);
            q = firestore.query(hikesRef, firestore.where(names[0], '==', values[0]), firestore.where(names[1], '==', values[1]), firestore.where(names[2], '==', values[2]), 
                    firestore.where(names[3], '==', values[3]));
            break;
        default:
            break;
    }
    if(cont === 0){
        const querySnapshot = await firestore.getDocs(hikesRef);
        querySnapshot.forEach((doc)=>{
            res.push(doc.data());
        });
    }else{
        const querySnapshot = await firestore.getDocs(q);
        querySnapshot.forEach((doc)=>{
            res.push(doc.data());
        });
    }
    return res;
}

function testHikeList(filter){
    it("Viewing a list of hikes with some filters ",function(done){
        hikesList(filter)
        .then((res)=>{
            res.length.should.equal(8)
            })
        .then(() => done(), done)
        .catch((error) => {
            done(error);
        });
    })
}
