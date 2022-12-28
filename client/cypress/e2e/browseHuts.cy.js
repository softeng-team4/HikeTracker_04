before(() => {
  cy.visit('http://localhost:3000/')
  cy.contains('Sign In').click()
  cy.url().should('include', '/login')
  cy.get('.email-input').clear()
  cy.get('.password-input').clear()
  cy.get('.email-input').clear().type('masterale1999@gmail.com')
  cy.get('.password-input').clear().type('password')
  cy.get('.loginbtn').click()
  cy.go("back")
  cy.wait(1000)
})

after(()=>{
  cy.logout();
})

describe('Browse Huts', () => {

  it('Access page', () => {
    cy.visit("http://localhost:3000/huts")
    cy.get(".card").should("have.length", 4)
  })

  it('Change page', () => {
    cy.visit("http://localhost:3000/huts")
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(6) > .page-link').click()
    cy.get(".card").should("have.length", 4)
  })

  it('Search existing hut - with right capital letters', () => {
    cy.visit("http://localhost:3000/huts")
    cy.get('#header-search').type("Marini")
    cy.get('.searchNameBtn').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("Rifugio Giuliano Marini")
  })

  it('Search existing hut - with wrong capital letters', () => {
    cy.visit("http://localhost:3000/huts")
    cy.get('#header-search').type("maRiNi")
    cy.get('.searchNameBtn').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("Rifugio Giuliano Marini")
  })

  it('Search existing hut - without capital letters', () => {
    cy.visit("http://localhost:3000/huts")
    cy.get('#header-search').type("marini")
    cy.get('.searchNameBtn').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("Rifugio Giuliano Marini")
  })

  it('Search non-existing hut', () => {
    cy.visit("http://localhost:3000/huts")
    cy.get('#header-search').type("Martini")
    cy.get('.searchNameBtn').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("No huts found!")
  })

})