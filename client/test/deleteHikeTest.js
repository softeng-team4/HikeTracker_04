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

describe('testing delete hike function', async () => {
    const user={
        email: "chicco.siviero@gmail.com",
        password: "chicco"
    }
    await api.logIn(user.email,user.password)
    const hike1 = {
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
    const hike2 = {
        ascent: "-Infinity",
        author: "aleganino@gmail.com",
        city: "",
        country: "",
        description: "A trip around Bussoleno. Perfect for tourists who want to experiment the beaty of Italian mountains without too much effort",
        difficulty: "Tourist",
        endPoint: {
            altitude: null,
            id: null,
            latitude: 45.1360752,
            longitude: 7.1463475,
            name: null,
            time: null
        },
        expectedTime: "300",
        length: "11741.12",
        linkedHuts: [{
            hutId: "3",
            lat: 45.113735,
            lng: 9.067172,
            name: "Hut 3"
        },
        {
            hutId: "4",
            lat: 46.113735,
            lng: 11.067172,
            name: "Hut 4"
        }],
        referencePoint: '[{"lat":45.13604409,"lng":7.1464283},{"lat":45.13604321,"lng":7.14642635},{"lat":45.13604641,"lng":7.14642332},{"lat":45.13604869,"lng":7.14642093},{"lat":45.13605035,"lng":7.14641928},{"lat":45.13605004,"lng":7.14641881},{"lat":45.13604736,"lng":7.14641805},{"lat":45.13604296,"lng":7.14641641},{"lat":45.13603861,"lng":7.14641331},{"lat":45.13603433,"lng":7.14641097},{"lat":45.13602978,"lng":7.1464085}]',
        region: "",
        startPoint: {
            altitude: null,
            id: null,
            latitude: 45.13604409,
            longitude: 7.1464283,
            name: null,
            time: null
        },

        title: "Tourist trip around Bussoleno"
    };

    const hike3 = {
        ascent: "1242.42",
        author: "luca.mistruzzi@gmail.com",
        city: "Bussoleno",
        country: "Italy",
        description: "A beautiful trip around the xerothermal oasis",
        difficulty: "Professional Hiker",
        endPoint: {
            altitude: 526.25,
            id: null,
            latitude: 45.1360071,
            longitude: 7.1466373,
            name: null,
            time: "13 febbraio 2022 13:31:24 UTC+1"
        },
        expectedTime: "380",
        length: "15544.71",
        linkedHuts: [{
            hutId: "1",
            lat: 44.113446900517765,
            lng: 8.06554931951915,
            name: "Hut 1"
        },
        {
            hutId: "4",
            lat: 46.113735,
            lng: 11.067172,
            name: "Hut 4"
        }],
        referencePoint: '[{"lat":45.1360752,"lng":7.1464373},{"lat":45.1360922,"lng":7.1464649},{"lat":45.1360972,"lng":7.1464756},{"lat":45.1360999,"lng":7.146491},{"lat":45.1361001,"lng":7.1465058},{"lat":45.1360986,"lng":7.1465193},{"lat":45.1360955,"lng":7.1465329},{"lat":45.1360919,"lng":7.1465457},{"lat":45.1360888,"lng":7.1465586},{"lat":45.1360861,"lng":7.1465702},{"lat":45.1360854,"lng":7.1465817},{"lat":45.136086,"lng":7.1465932},{"lat":45.136087,"lng":7.1466052},{"lat":45.1360877,"lng":7.1466161},{"lat":45.1360879,"lng":7.1466259},{"lat":45.1360877,"lng":7.1466351},{"lat":45.1360884,"lng":7.1466445},{"lat":45.13609,"lng":7.1466527},{"lat":45.1360917,"lng":7.1466603}',
        region: "Piedmont",
        startPoint: {
            altitude: 500.03,
            id: null,
            latitude: 45.1360752,
            longitude: 7.1464373,
            name: null,
            time: "13 febbraio 2022 08: 07: 44 UTC+ 1"
        },

        title: "Mount Ciarmetta from Bussoleno"
    };
    before(async () => {

        const hikeQuery = firestore.query(testHikes);
        const querySnapshot = await firestore.getDocs(hikeQuery)
        querySnapshot.forEach(async (doc) => {
            await firestore.deleteDoc(firestore.doc(api.db, collection, doc.id))
        })
        await firestore.setDoc(firestore.doc(testHikes, "1"), hike1);
        await firestore.setDoc(firestore.doc(testHikes, "2"), hike2);
        await firestore.setDoc(firestore.doc(testHikes, "3"), hike3);

    })

    testDeleteHike("1");
})

function testDeleteHike(hutId){
    let cont = 0;
    it("Deleting an hike given its id", function (done) {
        api.deleteHike(hutId, collection)
            .then(async () => {
                const hikeQuery = firestore.query(testHikes);
                const querySnapshot = await firestore.getDocs(hikeQuery)
                querySnapshot.forEach(async (doc) => {
                    doc.id.should.not.equal(hutId);
                    cont++;
                })
                cont.should.equal(2);
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}