describe("get performance stats", () => {

    beforeEach(() => {
        cy.login('masterale1999@gmail.com', 'password')
    })

    afterEach(() => {
        cy.logout();
    })


    it("view performance stats", () => {
        cy.get('.dropdown-toggle').click()
        cy.get('.nav-profile-link').click()
        cy.get('.redirect-text').click()
        cy.url().should('include', '/profile')
        cy.get(':nth-child(9) > h2').contains('My Stats')
        cy.get('tbody > :nth-child(1) > :nth-child(1)').contains('Completed hikes')
        cy.get('tbody > :nth-child(2) > :nth-child(1)').contains('Distance')
        cy.get('tbody > :nth-child(3) > :nth-child(1)').contains('Highest elevation gain')
        cy.get('tbody > :nth-child(4) > :nth-child(1)').contains('Biggest ascent')
        cy.get('tbody > :nth-child(5) > :nth-child(1)').contains('Longest hike distance')
        cy.get('tbody > :nth-child(6) > :nth-child(1)').contains('Longest hike time')
        cy.get('tbody > :nth-child(7) > :nth-child(1)').contains('Shortest hike distance')
        cy.get('tbody > :nth-child(8) > :nth-child(1)').contains('Shortest hike time')
        cy.get('tbody > :nth-child(9) > :nth-child(1)').contains('Average pace')
        cy.get('tbody > :nth-child(10) > :nth-child(1)').contains('Fastest paced hike')
        cy.get('tbody > :nth-child(11) > :nth-child(1)').contains('Average vertical ascent speed')
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should("not.have.value",undefined)
        cy.get('tbody > :nth-child(2) > :nth-child(2)').should("not.have.value",undefined)
        cy.get('tbody > :nth-child(3) > :nth-child(2)').should("not.have.value",undefined)
        cy.get('tbody > :nth-child(4) > :nth-child(2)').should("not.have.value",undefined)
        cy.get('tbody > :nth-child(5) > :nth-child(2)').should("not.have.value",undefined)
        cy.get('tbody > :nth-child(6) > :nth-child(2)').should("not.have.value",undefined)
        cy.get('tbody > :nth-child(7) > :nth-child(2)').should("not.have.value",undefined)
        cy.get('tbody > :nth-child(8) > :nth-child(2)').should("not.have.value",undefined)
        cy.get('tbody > :nth-child(9) > :nth-child(2)').should("not.have.value",undefined)
        cy.get('tbody > :nth-child(10) > :nth-child(2)').should("not.have.value",undefined)
        cy.get('tbody > :nth-child(11) > :nth-child(2)').should("not.have.value",undefined)

    })

})