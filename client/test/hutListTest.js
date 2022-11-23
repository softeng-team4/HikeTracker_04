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

const testHuts = firestore.collection(api.db,"hut-test")

describe('test the searching for huts by a hiker',() =>{

    const hut1 = {
        name: "Rifugio", bedsNumber:10, description:"a nice place to rest", openingHour: 8, openingMinute: 30, closingHour: 21, closingMinute: 0, costPerNight: 30, position:[21.2,11.3]}
    const hut2 = {
        name: "Capanna remota", bedsNumber:15, description:"a nice place to relax", openingHour: 8, openingMinute: 30, closingHour: 21, closingMinute: 0, costPerNight: 70, position:[30.2,11.1]}
        const hut3 = {
            name: "Ristoro montano", bedsNumber:30, description:"you'll never want to leave", openingHour: 7, openingMinute: 0, closingHour: 22, closingMinute: 30, costPerNight: 25, position:[25.8,31.4]}
    before(async () =>{

        const hutQuery = firestore.query(testHuts);
        const querySnapshot = await firestore.getDocs(hutQuery)
        querySnapshot.forEach(async (doc) =>{
            await firestore.deleteDoc(firestore.doc(db,"hut-test",doc.id))
        })

        await firestore.setDoc(firestore.doc(testHuts, "1"), hut1);
        await firestore.setDoc(firestore.doc(testHuts, "2"), hut2);
        await firestore.setDoc(firestore.doc(testHuts, "3"), hut3);

    })
    testHutList([hut1,hut2,hut3])
})

function testHutList(huts){
    it("Viewing a list of huts",function(done){
        api.hutsList(filter,"hut-test")
        .then((res)=>{
            res.length.should.equal(n)
            for(let i = 0; i < res.length; i++){
                res[i].name.should.equal(huts[i].name)
                res[i].bedsNumber.should.equal(huts[i].bedsNumber)
                res[i].description.should.equal(huts[i].description)
                res[i].openingHour.should.equal(huts[i].openingHour)
                res[i].openingMinute.should.equal(huts[i].openingMinute)
                res[i].closingHour.should.equal(huts[i].closingMinute)
                res[i].closingMinute.should.equal(huts[i].closingMinute)
                res[i].costPerNight.should.equal(huts[i].costPerNight)
                res[i].position[0].should.equal(huts[i].position[0])
                res[i].position[1].should.equal(huts[i].position[1])
            }
            })
        .then(() => done(), done)
        .catch((error) => {
            done(error);
        });
    })
}