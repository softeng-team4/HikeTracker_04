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

const testHikes = firestore.collection(api.db,"hike-test")

describe('test the searching for huts by a hiker',() =>{

    before(async () =>{

        const hutQuery = firestore.query(testHuts);
        const querySnapshot = await firestore.getDocs(hutQuery)
        querySnapshot.forEach(async (doc) =>{
            await firestore.deleteDoc(firestore.doc(db,"hut-test",doc.id))
        })

        await firestore.setDoc(firestore.doc(testHuts, "1"), {
            name: "Rifugio", city: "Turin", country: "Italy",
            region: "Piemonte", coordinates:"", altitude:2000, nBeds:0, description:"", });

    })
})

function testHutList(filter, n){
    it("Viewing a list of huts with some filters ",function(done){
        api.hutsList(filter,"hut-test")
        .then((res)=>{
            res.length.should.equal(n)
            })
        .then(() => done(), done)
        .catch((error) => {
            done(error);
        });
    })
}