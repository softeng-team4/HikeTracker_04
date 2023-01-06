'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();


// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
const api = require('../src/API');

const testParkingLots = firestore.collection(api.db, "parkingLots-test")

describe('test the retrieving of parking lots', () => {

    const parkingLot1 = {
        name: "parkingLot_test1",
        country: "Italy",
        region: "Piedmont",
        city: "Turin",
        position: [45.0661034, 7.6525989],
        lotsNumber: 13,
        costPerDay: 3,
        description: "Parking lot in Turin center",
        openingHour: 6,
        openingMinute: 20,
        closingHour: 23,
        closingMinute: 45
    }

    const parkingLot2 = {
        name: "parkingLot_test2",
        country: "Italy",
        region: "Piedmont",
        city: "Turin",
        position: [45.0661034, 7.6525989],
        lotsNumber: 16,
        costPerDay: 2,
        description: "Parking lot in Turin",
        openingHour: 8,
        openingMinute: 10,
        closingHour: 22,
        closingMinute: 30
    }

    before(async () => {

        await api.logIn("chicco.siviero@gmail.com", "chicco")
        const parkingLotQuery = firestore.query(testParkingLots);
        const querySnapshot = await firestore.getDocs(parkingLotQuery)
        querySnapshot.forEach((doc) => {
            firestore.deleteDoc(firestore.doc(api.db, "parkingLots-test", doc.id))
        })

        await api.addNewParkingLot(parkingLot1, "parkingLots-test")
        await api.addNewParkingLot(parkingLot2, "parkingLots-test")

    })

    after(async () => {
        await api.logOut()
    })

    getAllParks([parkingLot1, parkingLot2])

});

function getAllParks(parkingLots) {
    it("get parking all parking lots", function (done) {
        api.getAllParkingLots("parkingLots-test")
            .then((res) => {
                res.length.should.equal(2)
                for (let i = 0; i < res.length; i++) {
                    res[i].name.should.equal(parkingLots[i].name)
                    res[i].country.should.equal(parkingLots[i].country)
                    res[i].region.should.equal(parkingLots[i].region)
                    res[i].lotsNumber.should.equal(parkingLots[i].lotsNumber)
                    res[i].costPerDay.should.equal(parkingLots[i].costPerDay)
                    res[i].description.should.equal(parkingLots[i].description)
                    res[i].openingHour.should.equal(parkingLots[i].openingHour)
                    res[i].openingMinute.should.equal(parkingLots[i].openingMinute)
                    res[i].closingHour.should.equal(parkingLots[i].closingHour)
                    res[i].closingMinute.should.equal(parkingLots[i].closingMinute)
                }
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}