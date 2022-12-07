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

const collection = "user-test-preferences"
const testUser = firestore.collection(api.db, collection)

describe('testing the update of preferences by an hiker',()=>{

    before(async ()=>{

        const userQuery = firestore.query(testUser);
        const querySnapshot = await firestore.getDocs(userQuery)
        querySnapshot.forEach(async (doc) =>{
            await firestore.deleteDoc(firestore.doc(db, collection, doc.id));
        })

        await firestore.setDoc(firestore.doc(testUser, "testeamail@test.it"), {
            email: "testeamail@test.it",
            firstName: "Paolo",
            lastName: "Rossi",
            phoneNumber: "1234567890",
            role: "Hiker"
        });
    });
    const user = {
        email: "testeamail@test.it",
        firstName: "Paolo",
        lastName: "Rossi",
        phoneNumber: "1234567890",
        role: "Hiker"
    }
    const preferences = {
        ascentRange:{
            max: 800,
            min: 0
        },
        lengthRange:{
            max: 15,
            min: 0
        },
        timeRange:{
            max: 600,
            min: 0
        }
    }

    testModifyUserPreferences(user, preferences);
})

function testModifyUserPreferences(user, preferences){
    it("Check preferences update ",function(done){
        api.modifyUserPreferences(user.email, preferences, collection)
        .then(()=>{
            firestore.getDoc(firestore.doc(api.db, collection, user.email))
            .then((doc) =>{
                doc.data.email.should.equal(user.email);
                doc.data.firstName.should.equal(user.firstName);
                doc.data.lastName.should.equal(user.lastName);
                doc.data.phoneNumber.should.equal(user.phoneNumber);
                doc.data.role.should.equal(user.name);
                doc.data.preferences.should.equal(preferences);
            })
        })
        .then(() => done(), done)
        .catch((error) => {
            done(error);
        });
    })
}