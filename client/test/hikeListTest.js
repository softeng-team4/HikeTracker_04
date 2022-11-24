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

describe('testing the definition of a new hike by a local guide',()=>{

    before(async ()=>{

        const hikeQuery = firestore.query(testHikes);
        const querySnapshot = await firestore.getDocs(hikeQuery)
        querySnapshot.forEach(async (doc) =>{
            await firestore.deleteDoc(firestore.doc(db,"hike-test",doc.id))
        })

        await firestore.setDoc(firestore.doc(testHikes, "1"), {
            ascent: 10, city: "Turin", country: "Italy", expectedTime: 5.3, length: 1000,
            region: "Piemonte", difficulty: "Tourist", title:"Hikes 1"});
        await firestore.setDoc(firestore.doc(testHikes, "2"), {
            ascent: 11, city: "Turin", country: "Italy", expectedTime: 2.6, length: 3000,
            region: "Piemonte", difficulty: "Pro", title:"Hikes 2"});
        await firestore.setDoc(firestore.doc(testHikes, "3"), {
            ascent: 21, city: "Turin", country: "Italy", expectedTime: 5.1, length: 2800,
            region: "Piemonte", difficulty: "Tourist", title:"Hikes 3"});
        await firestore.setDoc(firestore.doc(testHikes, "4"), {
            ascent: 24, city: "Turin", country: "Italy", expectedTime: 3.4, length: 1500,
            region: "Piemonte", difficulty: "Pro", title:"Hikes 4"});
        await firestore.setDoc(firestore.doc(testHikes, "5"), {
            ascent: 16, city: "Milan", country: "Italy", expectedTime: 2.5, length: 1800,
            region: "Lombardia", difficulty: "Tourist", title:"Hikes 5"});
        await firestore.setDoc(firestore.doc(testHikes, "6"), {
            ascent: 17, city: "Milan", country: "Italy", expectedTime: 9.5, length: 4000,
            region: "Lombardia", difficulty: "Pro", title:"Hikes 6"});
        await firestore.setDoc(firestore.doc(testHikes, "7"), {
            ascent: 28, city: "Milan", country: "Italy", expectedTime: 4.1, length: 4200,
            region: "Lombardia", difficulty: "Pro", title:"Hikes 7"});
        await firestore.setDoc(firestore.doc(testHikes, "8"), {
            ascent: 19, city: "Milan", country: "Italy", expectedTime: 4.5, length: 800,
            region: "Lombardia", difficulty: "Tourist", title:"Hikes 8"});

    })

    const filter1 = {country: undefined, region:undefined, city: undefined, difficulty: undefined, ascent:{min: 0, max: 8000}, length:{min:0,max:8000},expectedTime:{min:0,max:24}, pointRadius:{coordinates:[], radius:undefined}};
    const filter2 = {country: undefined, region:undefined, city: 'Milan', difficulty: 'Pro', ascent:{min: 0, max: 8000}, length:{min:0,max:8000},expectedTime:{min:0,max:24}, pointRadius:{coordinates:[], radius:undefined}};
    const filter3 = {country: 'Italy', region:'Lombardia', city: 'Milan', difficulty: undefined, ascent:{min: 0, max: 8000}, length:{min:0,max:8000},expectedTime:{min:5,max:24}, pointRadius:{coordinates:[], radius:undefined}};
    const filter4 = {country: 'Italy', region: undefined, city: undefined, difficulty: 'Tourist', ascent:{min: 0, max: 8000}, length:{min:0,max:2000},expectedTime:{min:0,max:24}, pointRadius:{coordinates:[], radius:undefined}};
    const filter5 = {country: 'Italy', region: undefined, city: undefined, difficulty: 'Tourist', ascent:{min: 0, max: 20}, length:{min:0,max:2000},expectedTime:{min:0,max:24}, pointRadius:{coordinates:[], radius:undefined}};
    const filter6= {country: 'Italy', region: undefined, city: undefined, difficulty: 'Tourist', ascent:{min: 0, max: 20}, length:{min:0,max:2000},expectedTime:{min:0,max:1}, pointRadius:{coordinates:[], radius:undefined}};

    testHikeList(filter1, 8);
    testHikeList(filter2, 2);
    testHikeList(filter3, 1);
    testHikeList(filter4, 3);
    testHikeList(filter5, 3);
    testHikeList(filter6, 0);


})

function testHikeList(filter, n){
    it("Viewing a list of hikes with some filters ",function(done){
        api.hikesList(filter,"hike-test")
        .then((res)=>{
            res.length.should.equal(n)
            })
        .then(() => done(), done)
        .catch((error) => {
            done(error);
        });
    })
}
