describe('Terminate a hike', () => {

    it('login', () => {
        cy.visit("http://localhost:3000");
        cy.get('[href="/login"] > .btn').click()
        cy.get('.email-input').clear()
        cy.get('.password-input').clear()
        cy.get('.email-input').type('masterale1999@gmail.com')
        cy.get('.password-input').type('password')
        cy.get('[align="right"] > .btn').click()
        cy.url().should('include', '/')
    })

    it('start a hike',() =>{

    })

})