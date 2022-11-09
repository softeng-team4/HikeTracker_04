'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

describe('testing the definition of a new hike by a local guide',()=>{

    before(async ()=>{

    })

    hike = {title:'',length:0,expTime:0,ascent:0,difficulty:'',startPoint:'',endPoint:'',refPoints:'',description:''}
    expStatus = 201
    newHike(hike,expStatus)
})

function newHike(hike,expRes){
    it("Local guide defining a hike ",function(done){
        agent.post('')
        .send(hike)
        .then(function(res){
            res.should.have.status(expRes)
            agent.get('')
            .then(function(res){
                res.should.have.status(200)
                res.body[1].title.should.equal(hike.title)
                res.body[1].length.should.equal(hike.length)
                res.body[1].expTime.should.equal(hike.expTime)
                res.body[1].ascent.should.equal(hike.ascent)
                res.body[1].difficulty.should.equal(hike.difficulty)
                res.body[1].startPoint.should.equal(hike.startPoint)
                res.body[1].endPoint.should.equal(hike.endPoint)
                res.body[1].refPoints.should.equal(hike.refPoints)
                res.body[1].description.should.equal(hike.description)
            })
        })
    })
}