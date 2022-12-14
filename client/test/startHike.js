'use strict';

const { assert, expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const dayjs = require('dayjs');

chai.use(chaiHttp);
chai.should();


// Import the functions you need from the SDKs you need
const firestore = require('firebase/firestore');
const { getMaxListeners } = require('process');
const api = require('../src/API');

const testHikes = firestore.collection(api.db, "regHikes-test")

describe('testing the definition of starting a new hike by a hiker', () => {

    before(async () => {
        await api.logIn("masterale1999@gmail.com", "password")
        const regHikesQuery = firestore.query(testHikes);
        const querySnapshot = await firestore.getDocs(regHikesQuery)
        querySnapshot.forEach((doc) => {
            firestore.deleteDoc(firestore.doc(api.db, "regHikes-test", doc.id))
        })

    })

    after(async () => {
        await api.logOut()
    })

    const regHike = {
        hikeId: '', status: "ongoing", startTime: dayjs().format('DD/MM/YYYY hh:mm:ss'), userId: 'dqy0828@gmail.com'
    }
    startHike(regHike)
    rejectStart(regHike)
})

function startHike(regHike) {
    it("Hiker start a hike ", function (done) {
        api.startHike(regHike, "regHikes-test")
            .then(() => {
                firestore.getDoc(firestore.doc(api.db, "regHikes-test", "1"))
                    .then((doc) => {
                        doc.data.hikeId.should.equal(regHike.hikeId)
                        doc.data.status.should.equal(regHike.status)
                        doc.data.startTime.should.equal(regHike.startTime)
                        doc.data.userId.should.equal(regHike.userId)
                    })
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}

function rejectStart(regHike) {
    it("Already started hike ", function (done) {
        api.startHike(regHike, "regHikes-test").catch((err) => {
            expect(err).to.be.equal("You already started a hike")
        })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}