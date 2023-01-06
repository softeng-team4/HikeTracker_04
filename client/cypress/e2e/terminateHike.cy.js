describe('update condition', () => {

    it('login by hut worker to update condition ', () => { 
        cy.visit('http://localhost:3000/')
        cy.contains('Sign In').click()
        cy.url().should('include', '/login')
        cy.get('.email-input').type('masterale1999@gmail.com')
        cy.get('.password-input').type('password')
        cy.get('[align="right"] > .btn').click()
        cy.url().should('include', '/')
        cy.get('.justify-content-sm-start > :nth-child(3)').click()
        cy.get('h5').contains("There is no active")
        cy.get('.justify-content-sm-start > :nth-child(1)').click()
        cy.get(':nth-child(4) > .card > .card-header > :nth-child(1) > .col-md-4 > .d-flex > .btn-primary').click()
        cy.get('.py-2 > .btn-success').click()
        cy.get('h2').contains("Active hike")
        cy.get('.btn-danger').click()
        cy.get('.py-2 > .btn-success').click()
        cy.get('.dropdown-toggle').click()
        cy.get('.logOutBtn').click()
    })
})