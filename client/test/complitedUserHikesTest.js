'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const dayjs = require('dayjs');

chai.use(chaiHttp);
chai.should();


// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
const api = require('../src/API');
//import { initializeApp } from "firebase/app";
//import { getFirestore, doc, query, collection, getDocs, deleteDoc, documentId, getDoc} from "firebase/firestore";
//import {addNewHike} from "../src/API"

const collection = "regHikes-test";
const testRegHikes = firestore.collection(api.db, collection);

describe('test the list of complited hikes of a logged hiker', async() =>{

    const regHike1 = {
        hikeId: "1",
        status: "terminated",
        startTime: dayjs().format('DD/MM/YYYY hh:mm:ss'),
        endTime: dayjs().format('DD/MM/YYYY hh:mm:ss'),
        passedRP: "[]",
        userId: "masterale1999@gmail.com"

    }
    const regHike2 = {
        hikeId: "2",
        status: "terminated",
        startTime: dayjs().format('DD/MM/YYYY hh:mm:ss'),
        endTime: dayjs().format('DD/MM/YYYY hh:mm:ss'),
        passedRP: "[]",
        userId: "masterale1999@gmail.com"

    }

    const regHike3 = {
        hikeId: "1",
        status: "ongoing",
        startTime: dayjs().format('DD/MM/YYYY hh:mm:ss'),
        endTime: dayjs().format('DD/MM/YYYY hh:mm:ss'),
        passedRP: "[]",
        userId: "masterale1999@gmail.com"

    }

    const regHike4 = {
        hikeId: "4",
        status: "terminated",
        startTime: dayjs().format('DD/MM/YYYY hh:mm:ss'),
        endTime: dayjs().format('DD/MM/YYYY hh:mm:ss'),
        passedRP: "[]",
        userId: "test@test.it"

    }

    before(async () => {
        await api.logIn("masterale1999@gmail.com", "password");
        const regHikesQuery = firestore.query(testRegHikes);
        const querySnapshot = await firestore.getDocs(regHikesQuery)
        querySnapshot.forEach(async (doc) => {
            await firestore.deleteDoc(firestore.doc(api.db, collection, doc.id))
        })
        await firestore.addDoc(testRegHikes, regHike1);
        await firestore.addDoc(testRegHikes, regHike2);
        await firestore.addDoc(testRegHikes, regHike3);
        await firestore.addDoc(testRegHikes, regHike4);

    })
    
    testMyCompletedHikes("masterale1999@gmail.com", 2);
    await api.logOut();
})

function testMyCompletedHikes(author, n) {
    it("Viewing a list of complited registred hikes", function (done) {
        api.MyCompletedHikes(collection)
            .then((res) => {
                res.length.should.equal(n);
                for(let i = 0; i < res.length; i++){
                    res[i].userId.should.equal(author);
                    res[i].status.should.equal("terminated");
                }
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}