'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();


// Import the functions you need from the SDKs you need
const firestore = require('firebase/firestore')
const api = require('../src/API');
const { GeoPoint } = require('firebase/firestore');

//import { initializeApp } from "firebase/app";
//import { getFirestore, doc, query, collection, getDocs, deleteDoc, documentId, getDoc} from "firebase/firestore";
//import {addNewHike} from "../src/API"

const testHuts = firestore.collection(api.db,"huts-test")

describe('testing the definition of a new hut by a local guide',()=>{

    before(async ()=>{

        const hutQuery = firestore.query(testHuts);
        const querySnapshot = await firestore.getDocs(hutQuery)
        querySnapshot.forEach((doc) =>{
            firestore.deleteDoc(firestore.doc(api.db,"huts-test",doc.id))
        })

    })

    const hut = {
        name: "hut_test",
        email: "test@test",
        phone: "1234567890",
        website: "hut_test.it",
        altitude: 200,
        country: "Italy",
        region: "Piedmont",
        city: "Turin", 
        position: [45.0661034, 7.6525989],
        bedsNumber: 10,
        costPerNight: 25,
        description: "Modern small hotel",
        openingHour: 6,
        openingMinute: 10,
        closingHour: 23,
        closingMinute: 45
    }
    newHunt(hut);
})

function newHunt(hut){
    it("Local guide defining a hut ",function(done){
        api.addNewHut(hut, "huts-test")
        .then(()=>{
            firestore.getDoc(firestore.doc(api.db,"huts-test", "1"))
            .then((doc) =>{
                doc.data().name.should.equal(hut.name);
                doc.data().country.should.equal(hut.country);
                doc.data().region.should.equal(hut.region);
                doc.data().city.should.equal(hut.city);
                doc.data().position.should.equal(new GeoPoint(hut.position[0], hut.position[1]));
                doc.data().bedsNumber.should.equal(hut.bedsNumber);
                doc.data().costPerNight.should.equal(hut.costPerNight);
                doc.data().description.should.equal(hut.description);
                doc.data().openingHour.should.equal(hut.openingHour);
                doc.data().openingMinute.should.equal(hut.openingMinute);
                doc.data().closingHour.should.equal(hut.closingHour);
                doc.data().closingMinute.should.equal(hut.closingMinute);
                
            })
        })
        .then(() => done(), done)
        .catch((error) => {
            done(error);
        });
    })
}