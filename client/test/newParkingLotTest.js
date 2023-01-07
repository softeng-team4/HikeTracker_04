'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();


// Import the functions you need from the SDKs you need
const firestore = require('firebase/firestore')
const api = require('../src/API');
const { GeoPoint } = require('firebase/firestore');

//import { initializeApp } from "firebase/app";
//import { getFirestore, doc, query, collection, getDocs, deleteDoc, documentId, getDoc} from "firebase/firestore";
//import {addNewHike} from "../src/API"

const testParkingLots = firestore.collection(api.db,"parkingLots-test")

describe('testing the definition of a new parking lot by a local guide',()=>{

    before(async ()=>{

        await api.logIn("chicco.siviero@gmail.com","chicco")
        const parkingLotQuery = firestore.query(testParkingLots);
        const querySnapshot = await firestore.getDocs(parkingLotQuery)
        querySnapshot.forEach((doc) =>{
            firestore.deleteDoc(firestore.doc(api.db,"parkingLots-test",doc.id))
        })

    })

    after(async () =>{
        await api.logOut()
    })

    const parkingLot = {
        name: "parkingLot_test",
        country: "Italy",
        region: "Piedmont",
        city: "Turin",
        position: [45.0661034, 7.6525989],
        lotsNumber: 13,
        costPerDay: 3,
        description: "Parking lot in Turin centre",
        openingHour: 6,
        openingMinute: 20,
        closingHour: 23,
        closingMinute: 45
    }
    newParkingLot(parkingLot);
})

function newParkingLot(parkingLot){
    it("Local guide defining a parking lot ",function(done){
        api.addNewParkingLot(parkingLot, "parkingLots-test")
        .then(()=>{
            firestore.getDoc(firestore.doc(api.db,"parkingLots-test","1"))
            .then((doc) =>{
                doc.data().name.should.equal(parkingLot.name);
                doc.data().position.should.equal(new GeoPoint(parkingLot.position[0], parkingLot.position[1]));
                doc.data().lotsNumber.should.equal(parkingLot.lotsNumber);
                doc.data().costPerDay.should.equal(parkingLot.costPerDay);
                doc.data().description.should.equal(parkingLot.description);
                doc.data().openingHour.should.equal(parkingLot.openingHour);
                doc.data().openingMinute.should.equal(parkingLot.openingMinute);
                doc.data().closingHour.should.equal(parkingLot.closingHour);
                doc.data().closingMinute.should.equal(parkingLot.closingMinute);
                doc.data().country.should.equal(parkingLot.country);
                doc.data().region.should.equal(parkingLot.region);
                doc.data().city.should.equal(parkingLot.city);
            })
        })
        .then(() => done(), done)
        .catch((error) => {
            done(error);
        });
    })
}