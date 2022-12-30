describe("Manager validating roles", () => {
    it ("Non admin login", () => {
        cy.login("aleganino@gmail.com","password")
        cy.get('.navbar').contains('Manage Users').should('not.exist')
        cy.logout()
        cy.visit("http://localhost:3000/manager")
        cy.contains('Nothing here')
    })

    it ("Admin login", () => {
        cy.visit("http://localhost:3000/")
        cy.login("s304890@studenti.polito.it","password")
        cy.get('.navbar').contains('Manage Users').click()
        cy.url().should('include', '/manager')
        cy.logout()
    })
    

    it ("Accept local guide", () => {
        cy.login("s304890@studenti.polito.it","password")
        cy.contains('Manage Users').click()
        cy.get(':nth-child(3) > .card > .card-header > .row > .d-flex > .btn-group > .btn.btn-success').click()
        cy.get('.modal-footer > .btn').click()
        cy.logout()
    })

    it ("Reject local guide", () => {
        cy.login("s304890@studenti.polito.it","password")
        cy.contains('Manage Users').click()
        cy.get(':nth-child(3) > .card > .card-header > .row > .d-flex > .btn-group > .btn-danger').click().wait(1000)
        cy.get('.modal-footer > .btn').click()
        cy.logout()
    })

    it ("Accept hut worker", () => {
        cy.login("s304890@studenti.polito.it","password")
        cy.contains('Manage Users').click()
        cy.get('.RoleSelection > :nth-child(2)').click()
        cy.get(':nth-child(3) > .card > .card-header > .row > .d-flex > .btn-group > .btn-success').click().wait(1000)
        cy.get('.modal-footer > .btn').click()
        cy.logout()
    })

    it ("Reject hut worker", () => {
        cy.login("s304890@studenti.polito.it","password")
        cy.contains('Manage Users').click()
        cy.get('.RoleSelection > :nth-child(2)').click()
        cy.get(':nth-child(3) > .card > .card-header > .row > .d-flex > .btn-group > .btn-danger').click().wait(1000)
        cy.get('.modal-footer > .btn').click()
        cy.logout()
    })
})