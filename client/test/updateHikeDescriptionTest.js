'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();


// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
const api = require('../src/API');
//import { initializeApp } from "firebase/app";
//import { getFirestore, doc, query, collection, getDocs, deleteDoc, documentId, getDoc} from "firebase/firestore";
//import {addNewHike} from "../src/API"

const collection = "hike-test";

const testHikes = firestore.collection(api.db, collection);

describe('update hike description test', async() => {

    const hike = {
        ascent: 1317.10,
        author: "luca.mistruzzi@gmail.com",
        city: "Buttigliera Alta",
        country: "Italy",
        description: "A beautiful path to Clarea river",
        difficulty: "Tourist",
        endPoint: {
            altitude: 1164,
            latitude: 45.15,
            longitude: 6.91,
            time: ''
        },
        expectedTime: '123',
        length: '16233.1',
        linkedHuts: [{
            hutId: "1",
            lat: 44.113446900517765,
            lng: 8.06554931951915,
            name: "Hut 1"
        },
        {
            hutId: "2",
            lat: 44.113735,
            lng: 8.067172,
            name: "Hut 2"
        },
        {
            hutId: "3",
            lat: 45.113735,
            lng: 9.067172,
            name: "Hut 3"
        }],
        referencePoint: "[{lat:45.150287,lng:6.957245},{lat:45.150357,lng:6.957153},{lat:45.150409,lng:6.957058},{lat:45.150453,lng:6.956938},{lat:45.150519,lng:6.956756},{lat:45.150644,lng:6.956636},{lat:45.150767,lng:6.956494},{lat:45.150788,lng:6.956485},{lat:45.150825,lng:6.956482},{lat:45.150863,lng:6.956481},{lat:45.150903,lng:6.956486},{lat:45.151037,lng:6.956559}",
        region: "Piedmont",
        startPoint: {
            altitude: 1164,
            latitude: 45.15,
            longitude: 6.91,
            time: ''
        },
        title: "Col Clapier from Val Carea"


    }
    
    before(async () => {
        await api.logIn("gianmarcobell95@gmail.com", "password123");
        const hikeQuery = firestore.query(testHikes);
        const querySnapshot = await firestore.getDocs(hikeQuery)
        querySnapshot.forEach(async (doc) => {
            await firestore.deleteDoc(firestore.doc(api.db, collection, doc.id))
        })
        await firestore.setDoc(firestore.doc(testHikes, "1"), hike);
    })

    const values={
        title: "Test title update", 
        expectedTime: 300, 
        difficulty: "Pro",
        description: "Test description update"
    }
    testUpdateHikeDescription(values, "1", hike);
    await api.logOut();

})

function testUpdateHikeDescription(values, hutId, hike){
    it("Updating an hike description given its id", function (done) {
        api.UpdateHikeDescription(values.title, values.expectedTime, values.difficulty, values.description, hutId, collection)
        .then(()=>{
            firestore.getDoc(firestore.doc(api.db, collection,"1"))
            .then((doc) =>{
                doc.data.title.should.equal(values.title);
                doc.data.length.should.equal(hike.length);
                doc.data.expectedTime.should.equal(values.expectedTime);
                doc.data.ascent.should.equal(hike.ascent);
                doc.data.difficulty.should.equal(values.difficulty);
                doc.data.startPoint.should.equal(hike.startPoint);
                doc.data.endPoint.should.equal(hike.endPoint);
                doc.data.description.should.equal(values.description);
                doc.data.country.should.equal(hike.country);
                doc.data.region.should.equal(hike.region);
                doc.data.city.should.equal(hike.city);
                doc.data.linkedHuts.should.equal(hike.linkedHuts);
                doc.data.referencePoint.should.equal(hike.referencePoint);
            })
        })
        .then(() => done(), done)
        .catch((error) => {
            done(error);
        });
    })
}