describe("Modify hike", () => {
    it("Open my hikes page", () =>{
        cy.login("aleganino@gmail.com","password")
        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-menu > .modify-page').click().wait(5000)
        cy.get('.LinkedHikesContainer').should("exist")
        cy.logout()
    })

    it("Open edit page", () =>{
        cy.login("aleganino@gmail.com","password")
        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-menu > .modify-page').click().wait(5000)
        cy.get('.LinkedHikesContainer').should("exist")
        cy.get(':nth-child(5) > .card > .card-header > :nth-child(1) > .col-md-4 > .d-flex > .btn-group > .btn-primary').click()
        cy.logout()
    })

    
    it("Delete hike", () =>{
        cy.login("aleganino@gmail.com","password")
        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-menu > .modify-page').click().wait(5000)
        cy.get(':nth-child(5) > .card > .card-header > :nth-child(1) > .col-md-4 > .d-flex > .btn-group > .btn-danger').click()
        cy.get('.btn-secondary').click()
        cy.logout()
    })

    it("Edit basic info", () =>{
        cy.login("aleganino@gmail.com","password")
        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-menu > .modify-page').click().wait(5000)
        cy.get(':nth-child(5) > .card > .card-header > :nth-child(1) > .col-md-4 > .d-flex > .btn-group > .btn-primary').click()
        cy.get('.col-lg-1 > .btn').click()
        cy.get('.title-input').clear()
        cy.get('.title-input').type("test")
        cy.get('.difficulty-input').select("Hiker (Medium)")
        cy.get('.expTime-input').type(123)
        cy.get(':nth-child(5) > .col > .region-input').type("test")
        cy.get('.btn-success').click()
        cy.logout()
    })

})