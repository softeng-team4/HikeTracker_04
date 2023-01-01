describe('Browse Huts', () => {

  beforeEach(() => {
    // cy.visit('http://localhost:3000/')
    // cy.contains('Sign In').click()
    // cy.url().should('include', '/login')
    // cy.get('.email-input').clear()
    // cy.get('.password-input').clear()
    // cy.get('.email-input').clear().type('masterale1999@gmail.com')
    // cy.get('.password-input').clear().type('password')
    // cy.get('.loginbtn').click()
    cy.login('masterale1999@gmail.com','password')
    cy.contais('Explore huts')
    cy.url().should('include', '/huts')

  })
  
  afterEach(() => {
    cy.logout();
  })

  it('Access page', () => {
    cy.get(".card").should("have.length", 4)
  })

  it('Change page', () => {
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(6) > .page-link').click()
    cy.get(".card").should("have.length", 4)
  })

  it('Search existing hut - with right capital letters', () => {
    cy.get('#header-search').type("Marini")
    cy.get('.searchNameBtn').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("Rifugio Giuliano Marini")
  })

  it('Search existing hut - with wrong capital letters', () => {
    cy.get('#header-search').type("maRiNi")
    cy.get('.searchNameBtn').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("Rifugio Giuliano Marini")
  })

  it('Search existing hut - without capital letters', () => {
    cy.get('#header-search').type("marini")
    cy.get('.searchNameBtn').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("Rifugio Giuliano Marini")
  })

  it('Search non-existing hut', () => {
    cy.get('#header-search').type("Martini")
    cy.get('.searchNameBtn').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("No huts found!")
  })

  it('Search by country not found', () => {
    cy.get('.CountrySelection').select('CN').should('have.value', 'CN')
    cy.contains('No huts found!')
  })

  it('Search by selection box', () => {
    cy.get('.CountrySelection').select('IN').should('have.value', 'IN')
    cy.get('.button-geoArea').click()
    cy.contains('Country: India')
    cy.get('.RegionSelection').select('TG').should('have.value', 'TG')
    cy.get('.button-geoArea').click()
    cy.contains('Region: Telangana')
    cy.get('.CitySelection').select('Bodhan').should('have.value', 'Bodhan')
    cy.get('.button-geoArea').click()
    cy.contains('City: Bodhan')
  })

  it('check info of huts', ()=>{
    cy.contains('Name')
    cy.contains('Phone')
    cy.contains('Email')
    cy.contains('Latitude')
    cy.contains('Longtitude')
    cy.contains('Alltitude')
    cy.contains('Country')
    cy.contains('Region')
    cy.contains('City')
    cy.contains('Website')
    cy.contains('Description')
    cy.contains('Number of beds')
  })

  it('search by selecting an altitude range', ()=>{
    cy.get('.AltitudeRange > div > span[style="left: 80%;"]').click()
    

  })

})