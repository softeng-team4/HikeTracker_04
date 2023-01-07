'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();


// Import the functions you need from the SDKs you need
const firebase = require('firebase/app');
const firestore = require('firebase/firestore');
const { json } = require('react-router');
const api = require('../src/API');
const dayjs = require('dayjs');
//import { initializeApp } from "firebase/app";
//import { getFirestore, doc, query, collection, getDocs, deleteDoc, documentId, getDoc} from "firebase/firestore";
//import {addNewHike} from "../src/API"

const collection = "user_test";
const hike_collection = "hike_test";

const testHikes = firestore.collection(api.db, hike_collection);
const testUsers = firestore.collection(api.db, collection);

describe('testing user stats update', async () => {

    const hike1 = {
        ascent: 1317.10,
        author: "luca.mistruzzi@gmail.com",
        city: "Buttigliera Alta",
        country: "Italy",
        description: "A beautiful path to Clarea river",
        difficulty: "Tourist",
        endPoint: {
            altitude: 1164,
            latitude: 45.15,
            longitude: 6.91,
            time: ''
        },
        expectedTime: '123',
        length: '16233.1',
        linkedHuts: [{
            id: "1",
            lat: 44.113446900517765,
            lng: 8.06554931951915,
            name: "Hut 1"
        },
        {
            id: "2",
            lat: 44.113735,
            lng: 8.067172,
            name: "Hut 2"
        },
        {
            id: "3",
            lat: 45.113735,
            lng: 9.067172,
            name: "Hut 3"
        }],
        referencePoint: JSON.stringify([{ name: "test1", alt: 1100, lat: 45.150287, lng: 6.957245 },
        { name: "test2", alt: 1500, lat: 45.150357, lng: 6.957153 },
        { lat: 45.150409, lng: 6.957058 },
        { lat: 45.150453, lng: 6.956938 },
        { lat: 45.150519, lng: 6.956756 }]),
        region: "Piedmont",
        startPoint: {
            altitude: 1164,
            latitude: 45.15,
            longitude: 6.91,
            time: ''
        },
        title: "Col Clapier from Val Carea"
    };

    const hike2 = {
        ascent: "571.00",
        author: "luca.mistruzzi@gmail.com",
        city: "Alba",
        country: "Italy",
        description: "A long trip into Langhe, tip use a bike",
        difficulty: "Professional Hiker",
        endPoint: {
            altitude: 171,
            id: "KAvj37c96xvKnl2wQqUW",
            latitude: 44.69726806120573,
            longitude: 8.032904863357546,
            name: "Alba rest hut",
            time: {
                nanoseconds: 0,
                seconds: 1579777830
            },
            type: "hut"
        },

        expectedTime: "840",
        length: "70567.35",
        referencePoint: JSON.stringify([{ name: "test1", alt: 45, "lat": 44.69796918332577, "lng": 8.031185902655125 },
        { name: "test2", alt: 200, "lat": 44.6979692671448, "lng": 8.031185735017061 },
        { "lat": 44.697800958529115, "lng": 8.031370555981994 },
        { "lat": 44.69741463661194, "lng": 8.031746065244079 }]),
        region: "Piedmont",
        startPoint: {
            altitude: 171,
            id: "iTqxvm3hnoleRCkNcVRT",
            latitude: 44.6970181966006,
            longitude: 8.031703233718874,
            name: "Alba central station parking lot",
            time: {
                nanoseconds: 0,
                seconds: 1579777830,
            },
            type: "parking lot"
        },

        title: "Test hike"
    };

    const hike3 = {
        ascent: "1242.42",
        author: "luca.mistruzzi@gmail.com",
        city: "Bussoleno",
        country: "Italy",
        description: "A beautiful trip around the xerothermal oasis",
        difficulty: "Professional Hiker",
        endPoint: {
            altitude: 526.25,
            id: null,
            latitude: 45.1360071,
            longitude: 7.1466373,
            name: null,
            time: "13 febbraio 2022 13:31:24 UTC+1"
        },
        expectedTime: "380",
        length: "15544.71",
        linkedHuts: [{
            id: "1",
            lat: 44.113446900517765,
            lng: 8.06554931951915,
            name: "Hut 1"
        },
        {
            id: "4",
            lat: 46.113735,
            lng: 11.067172,
            name: "Hut 4"
        }],
        referencePoint: JSON.stringify([{ "lat": 45.1360752, "lng": 7.1464373 },
        { name: "test1", alt: 580, "lat": 45.1360922, "lng": 7.1464649 },
        { name: "test2", alt: 500, "lat": 45.1360972, "lng": 7.1464756 },
        { name: "test3", alt: 440, "lat": 45.1360999, "lng": 7.146491 },
        { "lat": 45.1361001, "lng": 7.1465058 },
        { "lat": 45.1360986, "lng": 7.1465193 },
        { "lat": 45.1360955, "lng": 7.1465329 },
        { "lat": 45.1360919, "lng": 7.1465457 },
        { "lat": 45.1360888, "lng": 7.1465586 }]),
        region: "Piedmont",
        startPoint: {
            altitude: 500.03,
            id: null,
            latitude: 45.1360752,
            longitude: 7.1464373,
            name: null,
            time: "13 febbraio 2022 08: 07: 44 UTC+ 1"
        },

        title: "Mount Ciarmetta from Bussoleno"
    };

    const user = {
        email: "apiTest@test.it",
        firstName: "test",
        hutId: "",
        lastName: "API",
        phoneNumber: "1234567890",
        reqRole: "",
        reqStatus: "",
        respDate: "",
        role: "Hiker",
        username: "apiTest"
    };

    before(async () => {
        await api.logIn("s304890@studenti.polito.it", "password");
        const hikeQuery = firestore.query(testHikes);
        const querySnapshot = await firestore.getDocs(hikeQuery);
        querySnapshot.forEach(async (doc) => {
            await firestore.deleteDoc(firestore.doc(api.db, hike_collection, doc.id));
        })
        await firestore.deleteDoc(firestore.doc(api.db, collection, "apiTest@test.it"));
        await firestore.setDoc(firestore.doc(testHikes, "1"), hike1);
        await firestore.setDoc(firestore.doc(testHikes, "2"), hike2);
        await firestore.setDoc(firestore.doc(testHikes, "3"), hike3);
        await firestore.setDoc(firestore.doc(testUsers, "apiTest@test.it"), user);

    })

    const regHike1 = {
        endTime: "04/01/2023 16:24:10",
        hikeId: "2",
        passedRP: JSON.stringify([{ name: "test1", alt: 45, "lat": 44.69796918332577, "lng": 8.031185902655125, time: "04/01/2023 15:40:10" },
        { name: "test2", alt: 200, "lat": 44.6979692671448, "lng": 8.031185735017061, time: "04/01/2023 16:06:10" }]),
        startTime: "04/01/2023 15:24:10",
        status: "terminated",
        userId: "apiTest@test.it"
    };

    const regHike2 = {
        endTime: "05/01/2023 16:50:10",
        hikeId: "1",
        passedRP: JSON.stringify([{ name: "test1", alt: 1100, lat: 45.150287, lng: 6.957245, time: "05/01/2023 16:05:20" },
        { name: "test2", alt: 1500, lat: 45.150357, lng: 6.957153, time: "05/01/2023 16:40:20" }]),
        startTime: "05/01/2023 16:00:10",
        status: "terminated",
        userId: "apiTest@test.it"
    };

    const expectedStats1 = {
        shortest_hike_distance: parseFloat(hike2.length),
        fastest_paced_hike: dayjs(regHike1.endTime).diff(dayjs(regHike1.startTime), 'hour', true) * 60 / parseFloat(hike2.length) / 1000,
        completed_hikes: 1,
        ascending_time: dayjs("04/01/2023 16:06:10").diff(dayjs("04/01/2023 15:40:10"), 'hour', true),
        longest_hike_distance: parseFloat(hike2.length),
        distance: parseFloat(hike2.length),
        highest_altitude: 200,
        ascent: 155,
        highest_altitude_range: 155,
        longest_hike_time: dayjs(regHike1.endTime).diff(dayjs(regHike1.startTime), 'hour', true),
        time: dayjs(regHike1.endTime).diff(dayjs(regHike1.startTime), 'hour', true),
        shortest_hike_time: dayjs(regHike1.endTime).diff(dayjs(regHike1.startTime), 'hour', true)
    };

    const expectedStats2 = {
        shortest_hike_distance: parseFloat(hike1.length),
        fastest_paced_hike: Math.min(dayjs(regHike2.endTime).diff(dayjs(regHike2.startTime), 'hour', true) * 60 / parseFloat(hike1.length) / 1000, dayjs(regHike1.endTime).diff(dayjs(regHike1.startTime), 'hour', true) * 60 / parseFloat(hike2.length) / 1000),
        completed_hikes: 2,
        ascending_time: dayjs("04/01/2023 16:06:10").diff(dayjs("04/01/2023 15:40:10"), 'hour', true) + dayjs("05/01/2023 16:40:20").diff(dayjs("05/01/2023 16:05:20"), 'hour', true),
        longest_hike_distance: parseFloat(hike2.length),
        distance: parseFloat(hike2.length) + parseFloat(hike1.length),
        highest_altitude: 1500,
        ascent: 155 + 400,
        highest_altitude_range: 400,
        longest_hike_time: dayjs(regHike1.endTime).diff(dayjs(regHike1.startTime), 'hour', true),
        time: dayjs(regHike1.endTime).diff(dayjs(regHike1.startTime), 'hour', true) + dayjs(regHike2.endTime).diff(dayjs(regHike2.startTime), 'hour', true),
        shortest_hike_time: dayjs(regHike2.endTime).diff(dayjs(regHike2.startTime), 'hour', true)
    };

    testFirstCompletedHike("apiTest@test.it", regHike1, expectedStats1);
    testStatsUpdate("apiTest@test.it", regHike2, expectedStats2);
    await api.logOut();
})

function testFirstCompletedHike(email, regHike, expectedStats) {
    it("Test stats update after the first hike", function (done) {
        api.updateUserStats(email, regHike, collection, hike_collection)
            .then(async () => {
                const stats = (await firestore.getDoc(firestore.doc(api.db, collection, email))).data().stats;
                stats.shortest_hike_distance.should.equal(expectedStats.shortest_hike_distance);
                stats.fastest_paced_hike.should.equal(expectedStats.fastest_paced_hike);
                stats.completed_hikes.should.equal(expectedStats.completed_hikes);
                stats.ascending_time.should.equal(expectedStats.ascending_time);
                stats.longest_hike_distance.should.equal(expectedStats.longest_hike_distance);
                stats.distance.should.equal(expectedStats.distance);
                stats.highest_altitude.should.equal(expectedStats.highest_altitude);
                stats.ascent.should.equal(expectedStats.ascent);
                stats.highest_altitude_range.should.equal(expectedStats.highest_altitude_range);
                stats.longest_hike_time.should.equal(expectedStats.longest_hike_time);
                stats.time.should.equal(expectedStats.time);
                stats.shortest_hike_time.should.equal(expectedStats.shortest_hike_time);
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}


function testStatsUpdate(email, regHike, expectedStats) {
    it("Test stats update", function (done) {
        api.updateUserStats(email, regHike, collection, hike_collection)
            .then(async () => {
                const stats = (await firestore.getDoc(firestore.doc(api.db, collection, email))).data().stats;
                stats.shortest_hike_distance.should.equal(expectedStats.shortest_hike_distance);
                stats.fastest_paced_hike.should.equal(expectedStats.fastest_paced_hike);
                stats.completed_hikes.should.equal(expectedStats.completed_hikes);
                stats.ascending_time.should.equal(expectedStats.ascending_time);
                stats.longest_hike_distance.should.equal(expectedStats.longest_hike_distance);
                stats.distance.should.equal(expectedStats.distance);
                stats.highest_altitude.should.equal(expectedStats.highest_altitude);
                stats.ascent.should.equal(expectedStats.ascent);
                stats.highest_altitude_range.should.equal(expectedStats.highest_altitude_range);
                stats.longest_hike_time.should.equal(expectedStats.longest_hike_time);
                stats.time.should.equal(expectedStats.time);
                stats.shortest_hike_time.should.equal(expectedStats.shortest_hike_time);
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}