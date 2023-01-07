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
        cy.contains('.btn-danger', 'Terminate Hike').click()
        cy.wait(1000)
        cy.contains('.btn', 'Yes').click()
        cy.logout()
    })

    beforeEach(() => {
        cy.visit('http://localhost:3000/active')
        cy.get('.btn-primary').click()
    })

    it("visualize map and reference points", () => {
        cy.get('.fa-info-circle').should('have.length', 3)
    })

    it("add a record point", () => {
        cy.get('.addPoint_0').click()
        cy.wait(300)
        cy.get('.addPoint_0').should('exist')
        cy.get('.addPoint_1').should('exist')
        cy.get('.removePoint_0').should('exist')
    })

    it("add a second record point", () => {
        cy.get('.addPoint_0').click()
        cy.wait(300)
        cy.get('.addPoint_0').click()
        cy.wait(300)
        cy.get('.addPoint_0').should('exist')
        cy.get('.removePoint_1').should('exist')
    })

    it("add a third record point", () => {
        cy.get('.addPoint_0').click()
        cy.wait(300)
        cy.get('.addPoint_0').click()
        cy.wait(300)
        cy.get('.addPoint_0').click()
        cy.wait(300)
        cy.get('.addPoint_0').should('not.exist')
        cy.get('.removePoint_2').should('exist')
    })

    it("remove inserted record point", () => {
        cy.get('.addPoint_0').click()
        cy.wait(300)
        cy.get('.removePoint_0').click()
        cy.wait(300)
        cy.get('.addPoint_0').should('exist')
        cy.get('.addPoint_1').should('exist')
        cy.get('.addPoint_2').should('exist')
    })

    it("submit record points", () => {
        cy.get('.addPoint_0').click()
        cy.wait(300)
        cy.get('.addPoint_0').click()
        cy.wait(300)
        cy.contains('.btn-success', 'Record point').click()
        cy.wait(1000)
        cy.contains('.btn', 'Yes').click()
        cy.get('.addPoint_0').should('exist')
        cy.get('.addPoint_1').should('not.exist')
        cy.get('.removePoint_0').should('not.exist')
    })
})