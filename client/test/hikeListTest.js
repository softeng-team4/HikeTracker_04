'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();


// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
const api = require('../src/API');

const testHikes = firestore.collection(api.db, "hike-test")

describe('testing the definition of a new hike by a local guide', () => {

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
        await firestore.setDoc(firestore.doc(testHikes, "2"), {
            ascent: 11, city: "Turin", country: "Italy", expectedTime: 2.6, length: 3000,
            region: "Piemonte", difficulty: "Pro", title: "Hikes 2", startPoint: { latitude: 45.46427, longitude: 9.18951 }
        });
        await firestore.setDoc(firestore.doc(testHikes, "3"), {
            ascent: 21, city: "Turin", country: "Italy", expectedTime: 5.1, length: 2800,
            region: "Piemonte", difficulty: "Tourist", title: "Hikes 3", startPoint: { latitude: 45.46427, longitude: 9.18951 }
        });
        await firestore.setDoc(firestore.doc(testHikes, "4"), {
            ascent: 24, city: "Turin", country: "Italy", expectedTime: 3.4, length: 1500,
            region: "Piemonte", difficulty: "Pro", title: "Hikes 4", startPoint: { latitude: 45.46427, longitude: 9.18951 }
        });
        await firestore.setDoc(firestore.doc(testHikes, "5"), {
            ascent: 16, city: "Milan", country: "Italy", expectedTime: 2.5, length: 1800,
            region: "Lombardia", difficulty: "Tourist", title: "Hikes 5", startPoint: { latitude: 45.46427, longitude: 9.18951 }
        });
        await firestore.setDoc(firestore.doc(testHikes, "6"), {
            ascent: 17, city: "Milan", country: "Italy", expectedTime: 9.5, length: 4000,
            region: "Lombardia", difficulty: "Pro", title: "Hikes 6", startPoint: { latitude: 45.46427, longitude: 9.18951 }
        });
        await firestore.setDoc(firestore.doc(testHikes, "7"), {
            ascent: 28, city: "Milan", country: "Italy", expectedTime: 4.1, length: 4200,
            region: "Lombardia", difficulty: "Pro", title: "Hikes 7", startPoint: { latitude: 45.46427, longitude: 9.18951 }
        });
        await firestore.setDoc(firestore.doc(testHikes, "8"), {
            ascent: 19, city: "Milan", country: "Italy", expectedTime: 4.5, length: 800,
            region: "Lombardia", difficulty: "Tourist", title: "Hikes 8", startPoint: { latitude: 45.46427, longitude: 9.18951 }
        });

    })

    const filter0 = { country: 'Italy', region: undefined, city: undefined, difficulty: undefined, ascent: { min: 0, max: 8000 }, length: { min: 0, max: 8000 }, expectedTime: { min: 0, max: 24 }, pointRadius: { coordinates: [], radius: undefined } };
    const filter1 = { country: undefined, region: undefined, city: undefined, difficulty: undefined, ascent: { min: 0, max: 8000 }, length: { min: 0, max: 8000 }, expectedTime: { min: 0, max: 24 }, pointRadius: { coordinates: [], radius: undefined } };
    const filter2 = { country: undefined, region: undefined, city: 'Milan', difficulty: 'Pro', ascent: { min: 0, max: 8000 }, length: { min: 0, max: 8000 }, expectedTime: { min: 0, max: 24 }, pointRadius: { coordinates: [], radius: undefined } };
    const filter3 = { country: 'Italy', region: 'Lombardia', city: 'Milan', difficulty: undefined, ascent: { min: 0, max: 8000 }, length: { min: 0, max: 8000 }, expectedTime: { min: 5, max: 24 }, pointRadius: { coordinates: [], radius: undefined } };
    const filter4 = { country: 'Italy', region: undefined, city: undefined, difficulty: 'Tourist', ascent: { min: 0, max: 8000 }, length: { min: 0, max: 2000 }, expectedTime: { min: 0, max: 24 }, pointRadius: { coordinates: [], radius: undefined } };
    const filter5 = { country: 'Italy', region: undefined, city: undefined, difficulty: 'Tourist', ascent: { min: 0, max: 20 }, length: { min: 0, max: 2000 }, expectedTime: { min: 0, max: 24 }, pointRadius: { coordinates: [], radius: undefined } };
    const filter6 = { country: 'Italy', region: undefined, city: undefined, difficulty: 'Tourist', ascent: { min: 0, max: 20 }, length: { min: 0, max: 2000 }, expectedTime: { min: 0, max: 1 }, pointRadius: { coordinates: [], radius: undefined } };
    const filter7 = { country: 'Italy', region: 'Lombardia', city: 'Milan', difficulty: 'Tourist', ascent: { min: 0, max: 20 }, length: { min: 0, max: 2000 }, expectedTime: { min: 0, max: 1 }, pointRadius: { coordinates: [], radius: undefined } };
    const filter8 = { country: undefined, region: undefined, city: undefined, difficulty: undefined, ascent: { min: 0, max: 8000 }, length: { min: 0, max: 8000 }, expectedTime: { min: 0, max: 24 }, pointRadius: { coordinates: [45.46427, 9.18951], radius: 5000 } };

    testHikeList(filter0, 8);
    testHikeList(filter1, 8);
    testHikeList(filter2, 2);
    testHikeList(filter3, 1);
    testHikeList(filter4, 3);
    testHikeList(filter5, 3);
    testHikeList(filter6, 0);
    testHikeList(filter7, 0);
    testHikeList(filter8, 8);


})

function testHikeList(filter, n) {
    it("Viewing a list of hikes with some filters ", function (done) {
        api.hikesList(filter, "hike-test")
            .then((res) => {
                res.length.should.equal(n)
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}
