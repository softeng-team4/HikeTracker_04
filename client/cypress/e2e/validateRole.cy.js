describe("Manager validating roles", () => {
    it ("Non admin login", () => {
        cy.login("aleganino@gmail.com","password")
        cy.get('.navbar').contains('Manage Users').should('not.exist')
        cy.visit("http://localhost:3000/manager")
        cy.url().should('not.include', '/manager')
        cy.logout()
    })

    it ("Admin login", () => {
        cy.login("s304890@studenti.polito.it","password")
        cy.get('.navbar').contains('Manage Users').click()
        cy.url().should('include', '/manager')
        cy.logout()
    })
    

    it ("Accept local guide", () => {
        cy.login("s304890@studenti.polito.it","password")
        cy.visit("http://localhost:3000/manager")
        cy.get('.RoleSelection > :nth-child(1)').click()
        cy.get(':nth-child(2) > .card > .card-header > .row > .d-flex > .btn-group > .btn-success').click().wait(1000)
        cy.get('.modal-footer > .btn').click()
        cy.logout()
    })

    it ("Reject local guide", () => {
        cy.login("s304890@studenti.polito.it","password")
        cy.visit("http://localhost:3000/manager")
        cy.get('.RoleSelection > :nth-child(1)').click()
        cy.get(':nth-child(2) > .card > .card-header > .row > .d-flex > .btn-group > .btn-danger').click().wait(1000)
        cy.get('.modal-footer > .btn').click()
        cy.logout()
    })

    it ("Accept hut worker", () => {
        cy.login("s304890@studenti.polito.it","password")
        cy.visit("http://localhost:3000/manager")
        cy.get('.RoleSelection > :nth-child(2)').click()
        cy.get(':nth-child(2) > .card > .card-header > .row > .d-flex > .btn-group > .btn-success').click().wait(1000)
        cy.get('.modal-footer > .btn').click()
        cy.logout()
    })

    it ("Reject hut worker", () => {
        cy.login("s304890@studenti.polito.it","password")
        cy.visit("http://localhost:3000/manager")
        cy.get('.RoleSelection > :nth-child(2)').click()
        cy.get(':nth-child(2) > .card > .card-header > .row > .d-flex > .btn-group > .btn-danger').click().wait(1000)
        cy.get('.modal-footer > .btn').click()
        cy.logout()
    })
})