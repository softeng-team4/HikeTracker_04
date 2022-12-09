describe('update condition', () => {

    it('login', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('.email-input').clear()
        cy.get('.password-input').clear()
        cy.get('.email-input').type('s300179@studenti.polito.it')
        cy.get('.password-input').type('123456789')
        cy.contains('Login').click()
        cy.url().should('include', '/')
    })

    it('click into update hike condition page', () => {
        cy.get('.align-self-center').click()
        cy.get('.condition-link').click()
        cy.url().should('include', '/hikeCondition')
    })

    it('get hike list', () => {
        cy.contains('Title')
        cy.contains('Location')
        cy.contains('Description')
        cy.contains('Condition')
        cy.contains('Condition Detail')
        cy.contains('Difficulty')
        cy.contains('Length')
        cy.contains('Ascent')
        cy.contains('Estimated Time')
    })

    it('see more information', () => {
        cy.contains('Show more info').click()
        cy.contains('Hike')
        cy.contains('Description')
        cy.contains('Difficulty')
        cy.contains('Length')
        cy.contains('Ascent')
        cy.contains('Estimated Time')
        cy.contains('Close').click()
    })

    it('update condition', () => {
        cy.get('.update_cond').click()
        cy.contains('Update Condition')
        cy.contains('Condition')
        cy.contains('Condition Detail')
        cy.get('.condition-input').select('partly blocked').should('have.value', 'partly blocked')
        cy.get('.condition-detail-input').type('Repair').should('have.value', 'Repair')
        cy.contains('Confirm').click()
        cy.contains('Update Condition Feedback')
        cy.contains('Update Condition Success!')
        cy.get('.close-feedback').click()
    })

    it('check changes', () => {
        cy.contains('partly blocked')
        cy.contains('Repair')
    })

    it('logout', () => {
        cy.contains('HUT').click()
        cy.contains('Sign out').click()
        cy.url().should('include', '/')
    })
})
