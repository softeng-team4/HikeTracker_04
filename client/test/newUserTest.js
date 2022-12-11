'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();// Import the functions you need from the SDKs you need
const firestore = require('firebase/firestore')
const fireAuth = require('firebase/auth')
const api = require('../src/API');

describe('testing the creation of a new user', () => {

    const userInfo1 = {
        email: 'kekkok99@gmail.com',
        username: 'frafio',
        firstName: "Francesco",
        lastName: "Fiorella",
        phoneNumber: "12345678",
        role: "Hiker",
        reqRole: "",
        reqStatus: "",
        respDate: "",
        hut: ""
    }

    const userInfo2 = {
        email :'kekkok99@gmail.com',
        username: 'frafio',
        firstName: "Francesco",
        lastName: "Fiorella",
        phoneNumber: "12345678",
        role: "Hiker",
        reqRole: "Hut worker",
        reqStatus: "pending",
        respDate: "",
        hut: ""
    }

    const userInfo3 = {
        email: 'kekkok99@gmail.com',
        username: 'frafio',
        firstName: "Francesco",
        lastName: "Fiorella",
        phoneNumber: "12345678",
        role: "Hiker",
        reqRole: "Local guide",
        reqStatus: "pending",
        respDate: "",
        hut: ""
    }

    const p = "12345678";

    before(async () => {
        deleteUser(userInfo1.email);
    });

    newUser(userInfo1, p, true);

    deleteUser(userInfo1.email);
    newUser(userInfo2, p);

    deleteUser(userInfo1.email);
    newUser(userInfo3, p);

    api.logOut()
})

function newUser(user, password, createAuth = false) {

    it("Adding a new user", function (done) {
        if (createAuth) {
            api.signUp(user, password)
            .then((newUser) => {
                newUser.email.should.equal(user.email)
                newUser.firstName.should.equal(user.firstName)
                newUser.lastName.should.equal(user.lastName)
                newUser.phoneNumber.should.equal(user.phoneNumber)
                newUser.role.should.equal(user.role)
                newUser.reqRole.should.equal(user.reqRole)
                newUser.reqStatus.should.equal(user.reqStatus)
                newUser.respDate.should.equal(user.respDate)
                newUser.hut.should.equal(user.hut)
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
        } else {
            api.createUserOnDb(user)
            .then((newUser) => {
                newUser.email.should.equal(user.email)
                newUser.firstName.should.equal(user.firstName)
                newUser.lastName.should.equal(user.lastName)
                newUser.phoneNumber.should.equal(user.phoneNumber)
                newUser.role.should.equal(user.role)
                newUser.reqRole.should.equal(user.reqRole)
                newUser.reqStatus.should.equal(user.reqStatus)
                newUser.respDate.should.equal(user.respDate)
                newUser.hut.should.equal(user.hut)
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
        }
    })
}

async function deleteUser(email) {
    await firestore.deleteDoc(firestore.doc(api.db, "users", email))
    await api.logOut();
}
