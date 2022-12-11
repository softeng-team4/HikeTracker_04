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
        cy.get('form > :nth-child(1) > #username').clear()
        cy.get('form > :nth-child(2) > #password').clear()
        cy.get('form > :nth-child(1) > #username').type(email)
        cy.get('form > :nth-child(2) > #password').type(password)
        cy.contains('Login').click()
        cy.url().should('include', '/')
})

Cypress.Commands.add('logout', () => {
    cy.get('.dropdown-toggle').click()
    cy.get('.logOutBtn').click()
})