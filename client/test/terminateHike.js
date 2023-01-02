'use strict';

const firestore = require('firebase/firestore')

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const api = require('../src/API');

describe('test: terminate hike by Hiker',()=>{
    it('test terminate hike', ()=> {
        // login to achieve permissions to write the db
        api.logIn('kekkok99@gmail.com', '12345678')

        const regHikeId='ytcPunTm2RVSHjeCEztJ'
        api.terminateHike(regHikeId).then(() => {
            const docRef = firestore.doc(api.db, "regHikes", regHikeId);
            firestore.getDoc(docRef).then((doc)=>{
                doc.data.status.should.equal("terminated")
            })
        })

        api.logOut()
    })

    it('test get active hike', ()=> {
        // login to achieve permissions to write the db
        api.logIn('kekkok99@gmail.com', '12345678')

        api.getUserActiveHike().then((doc) => {
            doc[0].status.should.equal("ongoing")
        })

        api.logOut()
    })
})