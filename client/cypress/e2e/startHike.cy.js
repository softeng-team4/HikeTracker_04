describe('Start Hike', () => {
    beforeEach(() => {
        cy.login('kekkok99@gmail.com', '12345678')
    })

    afterEach(() => {
        cy.logout();
    })
  
    it('Start and do not confirm', () => {
      cy.visit("http://localhost:3000/");
      cy.contains('Start Hike').click()
      cy.contains('Do you want to continue?')
      cy.contains('No').click()
    })
  
    it('Start an hike', () => {
      cy.visit("http://localhost:3000/");
      cy.contains('Start Hike').click()
      cy.contains('Do you want to continue?')
      cy.contains('Yes').click() 
    })
  
    it('Try to start again', () => {
      cy.visit("http://localhost:3000/");
      cy.contains('Pro Hiker').click()
      cy.contains('Start Hike').click()
      cy.contains('Do you want to continue?')
      cy.contains('Yes').click()
      cy.contains('You already started a hike')
    })
})