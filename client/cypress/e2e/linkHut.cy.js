describe('link huts', () => {

    it('link hut', () => {
        cy.login('dqy0828@gmail.com','123456789')
        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-menu > .modify-page').click()
        cy.url().should('include', '/myHikeList')
        cy.get(':nth-child(5) > .card > .card-header > :nth-child(1) > .col-md-4 > .d-flex > .btn-group > .btn-primary').click()
        cy.url().should('include', '/modifyHike')
        cy.url().should('include', '/modifyHike')
        cy.get('#modify-tab-handler-tab-LinkHuts').click()
        cy.get('.awesome-marker-icon-blue').first().click({force: true})
        cy.get('#sHObau64aEDosYMrbNln').click()
        cy.get('.btn-success').contains('Submit changes').click()
        //cy.get('.modal-footer > .btn-success')
        cy.get('.btn-secondary').click()
        cy.logout()
    })

    it('hike without possible huts', () => {
        cy.login("aleganino@gmail.com","password")
        cy.url().should('include', '/')
        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-menu > .modify-page').click()
        cy.url().should('include', '/myHikeList')
        cy.get(':nth-child(5) > .card > .card-header > :nth-child(1) > .col-md-4 > .d-flex > .btn-group > .btn-primary').click()
        cy.url().should('include', '/modifyHike')
        cy.get('#modify-tab-handler-tab-LinkHuts').click()
        cy.contains("There are not available huts close to this hike to be linked")
        cy.logout()
    })

})