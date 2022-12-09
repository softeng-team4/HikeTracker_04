describe("Validate roles", () => {

    it ("Accept local guide", () => {
        cy.login("s304890@studenti.polito.it","password")
        cy.logout()
    })

    it ("Reject local guide", () => {
        cy.login("s304890@studenti.polito.it","password")
        cy.logout()
    })

    it ("Accept hut worker", () => {
        cy.login("s304890@studenti.polito.it","password")
        cy.logout()
    })

    it ("Reject hut worker", () => {
        cy.login("s304890@studenti.polito.it","password")
        cy.logout()
    })
    
})