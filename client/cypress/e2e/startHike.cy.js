describe('Start Hike', () => {
    it('Login as an hiker', () => {
        cy.hardcodedLogin('kekkok99@gmail.com', '12345678')
        cy.resetRegHike('kekkok99@gmail.com')
    })
  
    it('Start and do not confirm', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('Start Hike').click()
        cy.contains('Do you want to continue?')
        cy.get('.noButton').click()
    })

    it('Start a hike, then try starting again', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('Start Hike').click()
        cy.contains('Do you want to continue?')
        cy.get('.yesButton').click()
        cy.contains('Start Hike').click()
        cy.contains('Do you want to continue?')
        cy.get('.yesButton').click()
        cy.contains('Oops!')
    })

    it('Reset and logout', () => {
        cy.visit('http://localhost:3000/')
        cy.logout();
    })
})