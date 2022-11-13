'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
const fireAuth = require('firebase/auth')
const api = require('../src/API');
//import { initializeApp } from "firebase/app";
//import { getFirestore, doc, query, collection, getDocs, deleteDoc, documentId, getDoc} from "firebase/firestore";
//import {addNewHike} from "../src/API"
const testUsers = firestore.collection(api.db,"users-test")

describe('testing the creation of a new user',()=>{

    const userInfo = {email: 'chicco.siviero@gmail.com',password:"chicco",firstName:"Federico",lastName:"Siviero",role:"local guide"}
    before(async () =>{

        await api.logIn(userInfo.email,userInfo.password);
        const auth = fireAuth.getAuth();
        const user = auth.currentUser;
        await fireAuth.deleteUser(user)
        await firestore.deleteDoc(firestore.doc(api.db,"users",userInfo.email))
    })

    newUser(userInfo);
})

function newUser(user){

    it("Adding a new user",function(done){
        api.signUp(user.email,user.password,user.firstName,user.lastName,user.role)
        .then((user)=>{

        })
        .then(() => done(), done)
        .catch((error) => {
            done(error);
        });
    })
}



