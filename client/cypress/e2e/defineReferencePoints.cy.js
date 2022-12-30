describe("defining reference points", () => {

    beforeEach(() => {
        cy.login('dqy0828@gmail.com', '123456789')
    })

    afterEach(() => {
        cy.logout();
    })


    it("define two reference points", () => {
        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-menu > .modify-page').click()
        cy.url().should('include', '/myHikeList')
        cy.get(':nth-child(5) > .card > .card-header > :nth-child(1) > .col-md-4 > .d-flex > .btn-group > .btn-primary').click()
        cy.url().should('include', '/modifyHike')
        cy.get('#modify-tab-handler-tab-refPoints').click()
        cy.get('.name-input').type('Hopefully a good spot')
        cy.get('#modify-tab-handler-tabpane-refPoints > .mt-3 > .leaflet-container > .leaflet-control-container > .leaflet-top.leaflet-left > .leaflet-control-zoom > .leaflet-control-zoom-in > span').click()
        cy.get('#modify-tab-handler-tabpane-refPoints > .mt-3 > .leaflet-container').click(431, 87)
        cy.get('#modify-tab-handler-tabpane-refPoints > .mt-3 > .btn-primary').click()
        cy.get('.name-input').type('Hopefully another good spot')
        cy.get('#modify-tab-handler-tabpane-refPoints > .mt-3 > .leaflet-container').click(506, 140)
        cy.get('#modify-tab-handler-tabpane-refPoints > .mt-3 > .btn-primary').click()
        cy.get('.btn-success').click()
        cy.get('.modal-footer > .btn').click()

    })

    it("define a reference point too far from the track", () => {
        cy.get('.form-check-input').click()
        cy.get('.btn-danger').click()
        cy.url().should('include', '/modifyHike')
        cy.get('#modify-tab-handler-tab-refPoints').click()
        cy.get('.name-input').type('Not a good spot')
        cy.get('#modify-tab-handler-tabpane-refPoints > .mt-3 > .leaflet-container > .leaflet-control-container > .leaflet-top.leaflet-left > .leaflet-control-zoom > .leaflet-control-zoom-in > span').click()
        cy.get('#modify-tab-handler-tabpane-refPoints > .mt-3 > .leaflet-container').click(875, 99)
        cy.get('#modify-tab-handler-tabpane-refPoints > .mt-3 > .btn-primary').click()
        cy.get('.mt-3 > .fade').should('be.visible')
    })

})