'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
const fireAuth = require('firebase/auth')
const api = require('../src/API');
const users = firestore.collection(api.db,'users')

describe("testing the management of local guide/hut worker role requests",() =>{

    before( async () ={

    })
    after(async () =>{
        //delete test users
    })
})