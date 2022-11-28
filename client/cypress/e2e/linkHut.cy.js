describe('link huts', () => {
    it('login', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('.email-input').clear()
        cy.get('.password-input').clear()
        cy.get('.email-input').type('dqy0828@gmail.com')
        cy.get('.password-input').type('123456789')
        cy.contains('Login').click()
        cy.url().should('include', '/')
    })

    it('link hut', () => {
        cy.get('.form-check-input').click()
        cy.get('.btn-danger').click()
        cy.url().should('include', '/modifyHike')
        cy.get('#modify-tab-handler-tab-LinkHuts').click()
        cy.get('.awesome-marker-icon-blue').click()
        cy.get('#A6e9rYeUqbiVdWx3rCNX').click()
        cy.get('.btn-success').click()
        //cy.get('.modal-footer > .btn-success')
        cy.get('.btn-secondary').click()
    })

    
    it('logout', () => {
        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-menu > :nth-child(3)').click()
    })

    it('login', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('.email-input').clear()
        cy.get('.password-input').clear()
        cy.get('.email-input').type('aleganino@gmail.com')
        cy.get('.password-input').type('password')
        cy.contains('Login').click()
        cy.wait(1000)
        cy.url().should('include', '/')
    })

    it('hike without possible huts', () => {
        cy.visit('http://localhost:3000/')
        cy.get('.form-check-input').click()
        cy.get(':nth-child(4) > .card > .card-header > .row > .d-flex > .btn-group > .btn-danger').click()
        cy.url().should('include', '/modifyHike')
        cy.get('#modify-tab-handler-tab-LinkHuts').click()
        cy.contains("There are not available huts close to this hike to be linked")
    })

    it('logout', () => {
        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-menu > :nth-child(3)').click()
    })

})