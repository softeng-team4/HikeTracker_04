describe('Browse Huts', () => {

  it('Access page', () => {
    cy.visit("http://localhost:3000/huts")
    cy.get(".card").should("have.length", 4)
  })

  it('Change page', () => {
    cy.reload()
    cy.get('#\\31').click()
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(6) > .page-link').click()
    cy.get(".card").should("have.length", 4)
  })

  it('Search existing hut - with right capital letters', () => {
    cy.visit("http://localhost:3000/huts")
    cy.get('#header-search').type("Marini")
    cy.get('form > button').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("Rifugio Giuliano Marini")
  })

  it('Search existing hut - with wrong capital letters', () => {
    cy.visit("http://localhost:3000/huts")
    cy.get('#header-search').type("maRiNi")
    cy.get('form > button').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("Rifugio Giuliano Marini")
  })

  it('Search existing hut - without capital letters', () => {
    cy.visit("http://localhost:3000/huts")
    cy.get('#header-search').type("marini")
    cy.get('form > button').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("Rifugio Giuliano Marini")
  })

  it('Search non-existing hut', () => {
    cy.visit("http://localhost:3000/huts")
    cy.get('#header-search').type("Martini")
    cy.get('form > button').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("No huts found!")
  })

})