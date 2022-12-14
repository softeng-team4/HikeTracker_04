'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();


// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
const api = require('../src/API');

const testHuts = firestore.collection(api.db, "hut-test")

describe('test the searching for huts by a hiker', () => {

    const filter1 = {
        name: undefined,
        country: undefined,
        region: undefined,
        city: undefined
    }

    const filter2 = {
        name: 'Rifugio',
        country: 'Italy',
        region: 'Piedmont',
        city: 'Alagna'
    }

    const filter3 = {
        name: 'Rifugio',
        country: undefined,
        region: undefined,
        city: undefined
    }

    const filter4 = {
        name: 'Rifugio',
        country: 'Italy',
        region: undefined,
        city: undefined
    }

    const filter5 = {
        name: 'Rifugio',
        country: 'Italy',
        region: 'Piedmont',
        city: undefined
    }

    const hut1 = {
        name: "Rifugio", country: 'Italy', region: 'Piedmont', city: 'Alagna', bedsNumber: 10, description: "a nice place to rest", openingHour: 8, openingMinute: 30, closingHour: 21, closingMinute: 0, costPerNight: 30, position: [21.2, 11.3]
    }
    const hut2 = {
        name: "Capanna remota", country: 'Italy', region: 'Vallee d\' Aoste', city: 'Cervinia', bedsNumber: 15, description: "a nice place to relax", openingHour: 8, openingMinute: 30, closingHour: 21, closingMinute: 0, costPerNight: 70, position: [30.2, 11.1]
    }
    const hut3 = {
        name: "Ristoro montano", country: 'Italy', region: 'Piedmont', city: 'Riva Valdobbia', bedsNumber: 30, description: "you'll never want to leave", openingHour: 7, openingMinute: 0, closingHour: 22, closingMinute: 30, costPerNight: 25, position: [25.8, 31.4]
    }
    before(async () => {
        await api.logIn("chicco.siviero@gmail.com", "chicco")
        const hutQuery = firestore.query(testHuts);
        const querySnapshot = await firestore.getDocs(hutQuery)
        querySnapshot.forEach(async (doc) => {
            await firestore.deleteDoc(firestore.doc(api.db, "hut-test", doc.id))
        })

        after(async () => {
            await api.logOut()
        })

        await firestore.setDoc(firestore.doc(testHuts, "1"), hut1);
        await firestore.setDoc(firestore.doc(testHuts, "2"), hut2);
        await firestore.setDoc(firestore.doc(testHuts, "3"), hut3);

    })
    testHutList([hut1, hut2, hut3], filter1, 3)
    testHutList([hut1], filter2, 1)
    testHutList([hut1], filter3, 1)
    testHutList([hut1], filter4, 1)
    testHutList([hut1], filter5, 1)
    testHutById(hut1, "1")
})

function testHutList(huts, filter, n) {
    it("Viewing a list of huts", function (done) {
        api.hutsList(filter, "hut-test")
            .then((res) => {
                res.length.should.equal(n)
                for (let i = 0; i < res.length; i++) {
                    res[i].name.should.equal(huts[i].name)
                    res[i].country.should.equal(huts[i].country)
                    res[i].region.should.equal(huts[i].region)
                    res[i].city.should.equal(huts[i].city)
                    res[i].bedsNumber.should.equal(huts[i].bedsNumber)
                    res[i].description.should.equal(huts[i].description)
                    res[i].openingHour.should.equal(huts[i].openingHour)
                    res[i].openingMinute.should.equal(huts[i].openingMinute)
                    res[i].closingMinute.should.equal(huts[i].closingMinute)
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

function testHutById(hut, id) {
    it("Retrieving hut by Id", function (done) {
        api.getHutById(id, "hut-test")
            .then((res) => {
                res.id.should.equal(id)
                res.name.should.equal(hut.name)
                res.country.should.equal(hut.country)
                res.region.should.equal(hut.region)
                res.city.should.equal(hut.city)
                res.bedsNumber.should.equal(hut.bedsNumber)
                res.description.should.equal(hut.description)
                res.openingHour.should.equal(hut.openingHour)
                res.openingMinute.should.equal(hut.openingMinute)
                res.closingMinute.should.equal(hut.closingMinute)
                res.closingMinute.should.equal(hut.closingMinute)
                res.costPerNight.should.equal(hut.costPerNight)
                res.position[0].should.equal(hut.position[0])
                res.position[1].should.equal(hut.position[1])
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}