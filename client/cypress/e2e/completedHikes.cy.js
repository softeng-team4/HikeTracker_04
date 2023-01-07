describe('completed hikes', () => {
    it('visit page with completed hikes', () => {
        cy.visit('http://localhost:3000/')
        cy.login('masterale1999@gmail.com','password').wait(5000)
        cy.get('.dropdown-toggle').click()
        cy.get('.completed-hikes').click().wait(5000)
        cy.get(':nth-child(1) > .card > .card-header > .row > :nth-child(3)').contains('Test hike')
        cy.logout()
    })

    it('visit page without completed hikes', () => {
        cy.visit('http://localhost:3000/')
        cy.login('dragonheart951@gmail.com','password123').wait(5000)
        cy.get('.dropdown-toggle').click()
        cy.get('.completed-hikes').click().wait(5000)
        cy.get('.card').contains('No hikes found!')
        cy.logout()
    })

    it('try to visit page (hut worker)', () => {
        cy.visit('http://localhost:3000/')
        cy.login('s300179@studenti.polito.it', '123456789' ).wait(5000)
        cy.get('.dropdown-toggle').click()
        cy.get('.completed-hikes').should('not.exist')
        cy.get('.dropdown-toggle').click()
        cy.logout()
    })

    it('try to visit page (local guide)', () => {
        cy.visit('http://localhost:3000/')
        cy.login('aleganino@gmail.com', 'password' ).wait(5000)
        cy.get('.dropdown-toggle').click()
        cy.get('.completed-hikes').should('not.exist')
        cy.get('.dropdown-toggle').click()
        cy.logout()
    })

    it('try to visit page (manager)', () => {
        cy.visit('http://localhost:3000/')
        cy.login('s304890@studenti.polito.it', 'password' ).wait(5000)
        cy.get('.dropdown-toggle').click()
        cy.get('.completed-hikes').should('not.exist')
        cy.get('.dropdown-toggle').click()
        cy.logout()
    })
})