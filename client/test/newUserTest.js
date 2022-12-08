'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();// Import the functions you need from the SDKs you need
const firestore = require('firebase/firestore')
const fireAuth = require('firebase/auth')
const api = require('../src/API');
const User = require('../src/model/User');

describe('testing the creation of a new user', () => {

    const userInfo1 = new User(
        'kekkok99@gmail.com',
        "Francesco",
        "Fiorella",
        "12345678",
        "Hiker",
        "",
        "",
        "",
        ""
    )

    const userInfo2 = new User(
        'kekkok99@gmail.com',
        "Francesco",
        "Fiorella",
        "12345678",
        "Hut worker",
        "Hut worker",
        "pending",
        "",
        ""
    )

    const userInfo3 = new User(
        'kekkok99@gmail.com',
        "Francesco",
        "Fiorella",
        "12345678",
        "Local guide",
        "Local guide",
        "pending",
        "",
        ""
    )

    const password = "12345678";

    before(async () => {
        deleteUser(userInfo1, password);
    })

    newUser(userInfo1, password);

    before(async () => {
        deleteUser(userInfo2, password);
    })

    newUser(userInfo2, password);

    before(async () => {
        deleteUser(userInfo3, password);
    })

    newUser(userInfo3, password);

    api.logOut()
})

function newUser(user, password) {

    it("Adding a new user", function (done) {
        api.signUp(user, password)
            .then((user) => {
                console.log(user)
                user.email.should.equal(userInfo1.email)
                user.firstName.should.equal(userInfo1.firstName)
                user.lastName.should.equal(userInfo1.lastName)
                user.phoneNumber.should.equal(userInfo1.phoneNumber)
                user.role.should.equal(userInfo1.role)
                user.reqRole.should.equal(userInfo1.reqRole)
                user.reqStatus.should.equal(userInfo1.reqStatus)
                user.respDate.should.equal(userInfo1.respDate)
                user.hut.should.equal(userInfo1.hut)
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}

async function deleteUser(user, password) {
    await api.logOut();
    await api.logIn(user.email, password);
    const auth = fireAuth.getAuth();
    const authuser = auth.currentUser;
    await fireAuth.deleteUser(authuser)
    await firestore.deleteDoc(firestore.doc(api.db, "users", user.email))
}
