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

const testHikes = firestore.collection(api.db,"hike-test")

describe('testing the definition of a new hike by a local guide',()=>{

    before(async ()=>{

        const hikeQuery = firestore.query(testHikes);
        const querySnapshot = await firestore.getDocs(hikeQuery)
        querySnapshot.forEach((doc) =>{
            firestore.deleteDoc(firestore.doc(api.db,"hike-test",doc.id))
        })

    })

    const hike = {title:'111',length:10,expTime:0,ascent:0,difficulty:2,startPoint:[45.555,34.222],endPoint:[78.999,22.111],refPoints:'',description:'222'}
    newHike(hike)
})

function newHike(hike){
    it("Local guide defining a hike ",function(done){
        api.addNewHike(hike,"hike-test")
        .then(()=>{
            firestore.getDoc(firestore.doc(api.db,"hike-test","1"))
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