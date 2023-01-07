describe("test record point of regHike", () => {

    before(() => {
        cy.login('masterale1999@gmail.com', 'password')
        cy.url().should('eq', 'http://localhost:3000/')
        cy.wait(4000)
        cy.get('.CountrySelection').select("Italy")
        cy.get('.RegionSelection').select("Piedmont")
        cy.get('.CitySelection').select("Alba")
        cy.get('.button-geoArea').click()
        cy.wait(1000)
        cy.get('.btn-primary').click()
        cy.wait(1000)
        cy.contains('.btn', 'Yes').click()
        cy.url().should('eq', 'http://localhost:3000/active')
        cy.wait(1000)
    })

    after(() => {
        cy.get('.btn-danger').click()
        cy.contains('.btn', 'Yes').click()
        cy.logout();
    })

    it("visualize map and reference points", () => {
        cy.get('.btn-primary').click()
        cy.get('.fa-info-circle').should('have.length', 3)
    })

    it("add a record point", () => {
        cy.get('.addPoint_0').click()
        cy.wait(300)
        cy.contains('.addPoint_0')
        cy.contains('.addPoint_1')
        cy.contains('.removePoint_0')
    })

    it("add a second record point", () => {
        cy.get('.addPoint_0').click()
        cy.wait(300)
        cy.contains('.addPoint_0')
        cy.contains('.removePoint_0')
    })

    it("add a third record point", () => {
        cy.get('.addPoint_0').click()
        cy.wait(300)
        cy.contains('.addPoint_0').should('not.exist')
        cy.contains('.removePoint_0')
    })

    it("remove last inserted record point", () => {
        cy.get('.removePoint_0').click()
        cy.wait(300)
        cy.contains('.addPoint_0')
        cy.contains('.removePoint_0')
    })
})