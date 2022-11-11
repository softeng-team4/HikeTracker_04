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
        querySnapshot.forEach((doc) =>{
            firestore.deleteDoc(firestore.doc(db,"hike-test",doc.id))
        })

    })

    const hike = {title:'',length:0,expTime:0,ascent:0,difficulty:'',startPoint:'',endPoint:'',refPoints:'',description:''}
    newHike(hike)
})

function newHike(hike){
    it("Local guide defining a hike ",function(done){
        firestore.addDoc(testHikes,hike)
        .then(()=>{
            firestore.getDoc(firestore.doc(db,"hike-test","1"))
            .then((doc) =>{
                doc.data.title.should.equal(hike.title)
                doc.data.length.should.equal(hike.length)
                doc.data.expTime.should.equal(hike.expTime)
                doc.data.ascent.should.equal(hike.ascent)
                doc.data.difficulty.should.equal(hike.difficulty)
                doc.data.startPoint.should.equal(hike.startPoint)
                doc.data.endPoint.should.equal(hike.endPoint)
                doc.data.refPoints.should.equal(hike.refPoints)
                doc.data.description.should.equal(hike.description)
            })
        })
        .then(() => done(), done)
        .catch((error) => {
            done(error);
        });
    })
}