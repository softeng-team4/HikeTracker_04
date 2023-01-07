import API from "../../src/API"
const fireAuth = require('firebase/auth');
import 'cypress-file-upload';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
        cy.visit('http://localhost:3000/login')
        cy.get('form > :nth-child(1) > #username').clear().type(email)
        cy.get('form > :nth-child(2) > #password').clear().type(password)
        cy.contains('Login').click()
        cy.url().should('include', '/')
})

Cypress.Commands.add('hardcodedLogin', (email, password) => {
    API.logIn(email, password)
})

Cypress.Commands.add('logout', () => {
    cy.get('.userDropdownButton').click()
    cy.get('.logOutBtn').click()
})

Cypress.Commands.add("createTestHike", (hike = {}) => {
    const point = {
        altitude: 1000,
        id: 12345,
        latitude: 45,
        longitude: 8,
        name: "generic point",
        time: ''
    }
    const newHike = {
        title: hike.title? hike.title : "test", 
        country: hike.country? hike.country :"Italy", 
        region: hike.region? hike.region :"Piedmont", 
        city: hike.city? hike.city : "Turin", 
        description: hike.description? hike.description : "description", 
        difficulty: hike.difficulty? hike.difficulty :"Hiker", 
        expectedTime: hike.expectedTime? hike.expectedTime : "123",
        length: hike.length? hike.length : "1234", 
        ascent: hike.ascent? hike.ascent : "1234", 
        startPoint: hike.startPoint? hike.startPoint : point, 
        endPoint: hike.endPoint? hike.endPoint : point, 
        referencePoint: hike.referencePoint? JSON.stringify(hike.referencePoint) : "", 
        author: hike.author? hike.author: "test"
    }
    API.addNewHike(newHike);
})

Cypress.Commands.add('deleteHike', (hikeId, collection="hikes") => {
    API.deleteHike(hikeId, collection)
})

Cypress.Commands.add('resetRegHike', (email) => {
    API.deleteRegHike(email)
})