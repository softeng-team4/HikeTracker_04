'use strict';

const firestore = require('firebase/firestore')

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const api = require('../src/API');

describe('test: record reference points by hiker',()=>{
    it('test refPoints', ()=> {
        // login to achieve permissions to write the db
        api.logIn('kekkok99@gmail.com', '12345678')

        const regHikeId='VTFQV06AChNT52b8mMq7'
        const refPoints='[{"name":"Test2","lat":45.0863072,"lng":6.9723468},{"name":"Test1","lat":45.083448,"lng":6.9780911},{"name":"Test 3","lat":45.0922565,"lng":6.986665},{"name":"test4","lat":45.0869677,"lng":6.9794907}]';
        api.updateRP(regHikeId, refPoints).then(() => {
            const docRef = firestore.doc(api.db, "regHikes", regHikeId);
            firestore.getDoc(docRef).then((doc)=>{
                doc.data.passedRP.should.equal(refPoints)
            })
        })

        api.logOut()
    })
})