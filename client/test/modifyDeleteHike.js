'use strict';

const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();


// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
const api = require('../src/API');

const testHikes = firestore.collection(api.db, "hike-test")

const linkedHuts = 'testString'
const modifiedStartPoint = { latitude: 10.0, longitude: 10.0 }
const modifiedEndPoint = { latitude: 20.0, longitude: 20.0 }

describe('test modify and delete of an hike', () => {

    after(async () => {
        await api.logOut()
    })

    before(async () => {
        await api.logIn("chicco.siviero@gmail.com", "chicco")
        const hikeQuery = firestore.query(testHikes);
        const querySnapshot = await firestore.getDocs(hikeQuery)
        querySnapshot.forEach(async (doc) => {
            await firestore.deleteDoc(firestore.doc(api.db, "hike-test", doc.id))
        })

        await firestore.setDoc(firestore.doc(testHikes, "1"), {
            ascent: 10, city: "Turin", country: "Italy", expectedTime: 5.3, length: 1000,
            region: "Piemonte", difficulty: "Tourist", title: "Hikes 1", startPoint: { latitude: 45.46427, longitude: 9.18951 }
        });
    })

    modifyHike()
    linkHuts()
    deleteHike()
});

function modifyHike() {
    it("modify the hike", function (done) {
        api.modifyHike("1", modifiedStartPoint, modifiedEndPoint, "hike-test").then(async () => {
            const hike = (await firestore.getDoc(firestore.doc(api.db, "hike-test", "1"))).data()
            hike.startPoint.latitude.should.equal(modifiedStartPoint.latitude)
            hike.startPoint.longitude.should.equal(modifiedStartPoint.longitude)
            hike.endPoint.latitude.should.equal(modifiedEndPoint.latitude)
            hike.endPoint.longitude.should.equal(modifiedEndPoint.longitude)
        })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}

function linkHuts() {
    it("link huts to the hike", function (done) {
        api.linkHuts(linkedHuts, "1", "hike-test").then(async () => {
            const hike = (await firestore.getDoc(firestore.doc(api.db, "hike-test", "1"))).data()
            hike.linkedHuts.should.equal(linkedHuts)
        })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}

function deleteHike() {
    it("delete the hike", function (done) {
        api.deleteHike("1", "hike-test").then(async () => {
            const hike = (await firestore.getDoc(firestore.doc(api.db, "hike-test", "1"))).data()
            expect(hike).to.be.undefined
        })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}