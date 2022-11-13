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
            Ascent: 10, City: "Turin", Country: "Italy", Expected_time: 5.3, Length: 1000,
            Region: "Piemonte", Difficulty: "Tourist", Title:"Hikes 1"});
        await firestore.setDoc(firestore.doc(testHikes, "2"), {
            Ascent: 11, City: "Turin", Country: "Italy", Expected_time: 2.6, Length: 3000,
            Region: "Piemonte", Difficulty: "Pro", Title:"Hikes 2"});
        await firestore.setDoc(firestore.doc(testHikes, "3"), {
            Ascent: 21, City: "Turin", Country: "Italy", Expected_time: 5.1, Length: 2800,
            Region: "Piemonte", Difficulty: "Tourist", Title:"Hikes 3"});
        await firestore.setDoc(firestore.doc(testHikes, "4"), {
            Ascent: 24, City: "Turin", Country: "Italy", Expected_time: 3.4, Length: 1500,
            Region: "Piemonte", Difficulty: "Pro", Title:"Hikes 4"});
        await firestore.setDoc(firestore.doc(testHikes, "5"), {
            Ascent: 16, City: "Milan", Country: "Italy", Expected_time: 2.5, Length: 1800,
            Region: "Lombardia", Difficulty: "Tourist", Title:"Hikes 5"});
        await firestore.setDoc(firestore.doc(testHikes, "6"), {
            Ascent: 17, City: "Milan", Country: "Italy", Expected_time: 9.5, Length: 4000,
            Region: "Lombardia", Difficulty: "Pro", Title:"Hikes 6"});
        await firestore.setDoc(firestore.doc(testHikes, "7"), {
            Ascent: 28, City: "Milan", Country: "Italy", Expected_time: 4.1, Length: 4200,
            Region: "Lombardia", Difficulty: "Pro", Title:"Hikes 7"});
        await firestore.setDoc(firestore.doc(testHikes, "8"), {
            Ascent: 19, City: "Milan", Country: "Italy", Expected_time: 4.5, Length: 800,
            Region: "Lombardia", Difficulty: "Tourist", Title:"Hikes 8"});

    })

    const filter1 = {country: undefined, region:undefined, city: undefined, difficulty: undefined, ascent:{min: 0, max: 8000}, length:{min:0,max:8000},expectedTime:{min:0,max:24}}
    const filter2 = {country: undefined, region:undefined, city: 'Milan', difficulty: 'Pro', ascent:{min: 0, max: 8000}, length:{min:0,max:8000},expectedTime:{min:0,max:24}}
    const filter3 = {country: 'Italy', region:'Lombardia', city: 'Milan', difficulty: undefined, ascent:{min: 0, max: 8000}, length:{min:0,max:8000},expectedTime:{min:5,max:24}}
    const filter4 = {country: 'Italy', region: undefined, city: undefined, difficulty: 'Tourist', ascent:{min: 0, max: 8000}, length:{min:0,max:2000},expectedTime:{min:0,max:24}}
    const filter5 = {country: 'Italy', region: undefined, city: undefined, difficulty: 'Tourist', ascent:{min: 0, max: 20}, length:{min:0,max:2000},expectedTime:{min:0,max:24}}
    const filter6= {country: 'Italy', region: undefined, city: undefined, difficulty: 'Tourist', ascent:{min: 0, max: 20}, length:{min:0,max:2000},expectedTime:{min:0,max:1}}

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
