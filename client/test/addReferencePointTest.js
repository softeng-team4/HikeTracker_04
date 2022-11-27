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

const testHikes = firestore.collection(api.db,"hike-test-reference-points")

describe('testing the addition of reference points by a local guide',()=>{

    before(async ()=>{

        const hikeQuery = firestore.query(testHikes);
        const querySnapshot = await firestore.getDocs(hikeQuery)
        querySnapshot.forEach(async (doc) =>{
            await firestore.deleteDoc(firestore.doc(db,"hike-test-reference-points",doc.id))
        })

        await firestore.setDoc(firestore.doc(testHikes, "1"), {
            ascent:"764.57",
            author:"aleganino@gmail.com",
            city:"Stroppiana",
            country:"Italy",
            description: "Partenza da Le Combe",
            difficulty:"Tourist",
            endPoint: {
                altitude: 1648.35,
                latitude: 45.1797556,
                longitude: 7.164966
            },
            expectedTime: "360",
            length: "9875.04",
            region: "Piedmont",
            startPoint:{
                altitude: 1641.59,
                latitude: 45.179357,
                longitude: 7.1644689
            },
            title: "Colle delle Coupe",
            referencePoint: '[{"lat":45.179357,"lng":7.1644689},{"lat":45.1793465,"lng":7.1644876},{"lat":45.1793246,"lng":7.1645212},{"lat":45.1793012,"lng":7.1645587},{"lat":45.1792856,"lng":7.1645948},{"lat":45.1792792,"lng":7.1646235}]',
        });
    });
    const hike = {
        id: "1",
        ascent:"764.57",
        author:"aleganino@gmail.com",
        city:"Stroppiana",
        country:"Italy",
        description: "Partenza da Le Combe",
        difficulty:"Tourist",
        endPoint: {
            altitude: 1648.35,
            latitude: 45.1797556,
            longitude: 7.164966
        },
        expectedTime: "360",
        length: "9875.04",
        referencePoint: '[{"lat":45.179357,"lng":7.1644689},{"lat":45.1793465,"lng":7.1644876},{"lat":45.1793246,"lng":7.1645212},{"lat":45.1793012,"lng":7.1645587},{"lat":45.1792856,"lng":7.1645948},{"lat":45.1792792,"lng":7.1646235}]',
        region: "Piedmont",
        startPoint:{
            altitude: 1641.59,
            latitude: 45.179357,
            longitude: 7.1644689
        },
        title: "Colle delle Coupe"
    }

    const refPoint = [
        {
            name : "Test point1",
            lat: 45.179357,
            lng: 7.1644689},
        {
            name : "Test point2",
            lat: 45.1792792,
            lng: 7.1646235
        }
    ]
    testAddRefPoint(hike, refPoint);
})

function testAddRefPoint(hike, refPoint){
    it("Check reference points addition ",function(done){
        api.modifyReferencePoints(hike, refPoint,"hike-test-reference-points")
        .then(()=>{
            firestore.getDoc(firestore.doc(api.db,"hike-test-reference-points","1"))
            .then((doc) =>{
                doc.data.title.should.equal(hike.title)
                doc.data.length.should.equal(hike.length)
                doc.data.expTime.should.equal(hike.expTime)
                doc.data.ascent.should.equal(hike.ascent)
                doc.data.difficulty.should.equal(hike.difficulty)
                doc.data.startPoint.should.equal(hike.startPoint)
                doc.data.endPoint.should.equal(hike.endPoint)
                doc.data.description.should.equal(hike.description)
                const points = JSON.parse(doc.data.referencePoint);
                points.forEach(p=>{
                    if(p.lat === refPoint[0].lat && p.lng === refPoint[0].lng){
                        p.name.should.equal(refPoint[0].name);
                    }
                    if(p.lat === refPoint[1].lat && p.lng === refPoint[1].lng){
                        p.name.should.equal(refPoint[1].name)
                    }
                })
            })
        })
        .then(() => done(), done)
        .catch((error) => {
            done(error);
        });
    })
}