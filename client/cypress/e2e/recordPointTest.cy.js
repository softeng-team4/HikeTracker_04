describe("test record point of regHike", () => {

    before(() => {
        cy.login('masterale1999@gmail.com', 'password')
        cy.wait(3000)
        cy.get('.CountrySelection').select("Italy")
        cy.get('.RegionSelection').select("Piedmont")
        cy.get('.CitySelection').select("Alba")
        cy.get('.button-geoArea').click()
        cy.wait(1000)
        cy.get('.btn-primary').click()
        cy.wait(1000)
        cy.get('.btn[value="Yes"]').click()
        cy.get('.h2').should('have.value', 'Active Hike')
    })

    after(() => {
        cy.logout();
        cy.get('btn-danger').click()
        cy.get('.btn-success').click()
    })

    it("visualize map and reference points", () => {
        cy.get('btn-primary').click()
        cy.get('fa-info-circle').should('have.length', 4)
    })
})