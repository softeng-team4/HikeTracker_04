'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
const fireAuth = require('firebase/auth')
const api = require('../src/API');
const users = firestore.collection(api.db,'users')

describe("testing the management of local guide/hut worker role requests",() =>{

    let users = []

    beforeEach( async () =>{

        users[0] = {
            email: "eeee.test@gmail.com",
            firstName: 'Marco',
            lastName: 'Rossi',
            role: 'hiker',
            reqRole: 'local guide',
            reqStatus: 'pending'
        }

        users[1] = {
            email: "fhjjr.test@gmail.com",
            firstName: 'Luca',
            lastName: 'Bianchi',
            role: 'hiker',
            reqRole: 'hut worker',
            reqStatus: 'pending',
            hutName: 'hut_test'
        }

       users[2] = {
            email: "ftoorr.test@gmail.com",
            firstName: 'Mara',
            lastName: 'Verdi',
            role: 'hiker',
            reqRole: 'hut worker',
            reqStatus: 'pending',
            hutName: 'hut_test'
        }

        const auth = fireAuth.getAuth()

        for (let u of users){
            await fireAuth.createUserWithEmailAndPassword(auth,u.email, "123456")
            await firestore.setDoc(firestore.doc(api.db, "users", u.email), u);
        }
       
    })

    
    testRequestList(users)

    function testRequestList(users){
        it("Viewing the list of requests",function(done){
            api.getRequestingUsers()
            .then( requests =>{
                requests = requests.filter((r) => r.email.includes(".test"))
                console.log(requests)
            for(let i = 0; i < users.length; i++){
                requests[i].email.should.equal(users[i].email)
                requests[i].firstName.should.equal(users[i].firstName)
                requests[i].lastName.should.equal(users[i].lastName)
                requests[i].role.should.equal(users[i].role)
                requests[i].reqRole.should.equal(users[i].reqRole)
                if(users[i].hutId){
                    requests[i].hutId.should.equal(users[i].hutId)
                    requests[i].hutName.should.equal(users[i].hutName)
                }
                requests[i].reqStatus.should.equal("pending")
            }
            })
            .then(() => done(), done)
            .catch((error) => {
            done(error);
        });
        })
    }
    afterEach(async () =>{
        const auth = fireAuth.getAuth()
        for( let u of users){
        await fireAuth.signInWithEmailAndPassword(auth,u.email,"123456")
        const user = auth.currentUser
        await fireAuth.deleteUser(user)
        await firestore.deleteDoc(firestore.doc(api.db,"users",user.email))
        }
    })

})