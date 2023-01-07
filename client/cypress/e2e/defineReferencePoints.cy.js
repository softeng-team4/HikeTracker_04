describe("defining reference points", () => {

    beforeEach(() => {
        cy.login('dqy0828@gmail.com', '123456789')
    })

    afterEach(() => {
        cy.logout();
    })


    it("define two reference points, one available, one far from track", () => {
        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-menu > .modify-page').click()
        cy.url().should('include', '/myHikeList')
        cy.get(':nth-child(5) > .card > .card-header > :nth-child(1) > .col-md-4 > .d-flex > .btn-group > .btn-primary').click()
        cy.url().should('include', '/modifyHike')
        cy.get('#modify-tab-handler-tab-refPoints').click()
        cy.get('.name-input').type('Hopefully a good spot')
        // cy.get('.leaflet-container > .leaflet-control-container > .leaflet-top.leaflet-left > .leaflet-control-zoom > .leaflet-control-zoom-in > span').click({multiple: true})
        cy.get('.map_ref').click(431, 87, { force: true })
        cy.get('.refAddBtn').click()
        cy.contains('Latitude')
        cy.contains('Longitude')
        cy.contains('Altitude')
        cy.contains('Name')
        cy.contains('Action')
        cy.contains('Hopefully a good spot')
        cy.contains('44.112392')
        cy.contains('8.067015')
        cy.get('.name-input').type('Hopefully another good spot')
        cy.get('.map_ref').click(506, 140)
        cy.get('.refAddBtn').click()
        cy.contains('Invalid position. Select a position on the track')
        cy.get('.refConfirmBtn').click()
        cy.get('.modal-footer > .btn').click()

    })

})