'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();


// Import the functions you need from the SDKs you need
const firestore = require('firebase/firestore')
const api = require('../src/API');
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
        country: "Italy",
        region: "Piedmont",
        city: "Turin", 
        hutPoint: [45.0661034, 7.6525989],
        bedsNumber: 10,
        description: "Modern small hotel"
    }
    newHunt(hut);
})

function newHunt(hut){
    it("Local guide defining a hut ",function(done){
        api.addNewHunt(hut.name, hut.bedsNumber, hut.description, hut.hutPoint, hut.country, hut.region, hut.city,"huts-test")
        .then(()=>{
            firestore.getDoc(firestore.doc(api.db,"huts-test", "1"))
            .then((doc) =>{
                doc.data().name.should.equal(hut.name);
                doc.data().position.should.equal(hut.hutPoint);
                doc.data().bedsNumber.should.equal(hut.bedsNumber);
                doc.data().description.should.equal(hut.description);
                doc.data().country.should.equal(hut.country);
                doc.data().region.should.equal(hut.region);
                doc.data().city.should.equal(hut.city);
            })
        })
        .then(() => done(), done)
        .catch((error) => {
            done(error);
        });
    })
}