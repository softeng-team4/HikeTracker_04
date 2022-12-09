before(() => {
  cy.visit('http://localhost:3000/login')
  cy.get('.email-input').clear()
  cy.get('.password-input').clear()
  cy.get('.email-input').type('luca.mistruzzi@gmail.com')
  cy.get('.password-input').type('1234567')
  cy.contains('Login').click()
  cy.wait(1000)
})

after('logout', () => {
  cy.visit('http://localhost:3000/')
  cy.get('.dropdown-toggle').click()
  cy.get('.logOutBtn').click()
})

describe('User Profile Open Offcanvas', () => {

  it('open user profile canvas', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.dropdown-toggle').click()
    cy.contains('Your profile').click()
  })
})

describe('User Profile Offcanvas', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('.dropdown-toggle').click()
    cy.contains('Your profile').click()
  })

  it('Close user profile canvas', () => {
    cy.get('.btn-close').click()
  })

  it('Should display user info', () => {
    cy.get('.offcanvas-body > .card > .card-header > .card-title').contains('Luca Mistruzzi')
    cy.get('.offcanvas-body > .card > .card-body').contains('email: luca.mistruzzi@gmail.com')
    cy.get('.offcanvas-body > .card > .card-body').contains('role: Local guide')
  })

  it('Submit button disabled', () => {
    cy.get('.btn-success').should('be.disabled')
  })

  it('Set preferences', () => {
    cy.get('.prefLengthRange > div > span[style="left: 80%;"]').click()
    cy.get('.prefAscentRange > div > span[style="left: 60%;"]').click()
    cy.get('.prefExpTimeRange > div > span[style="left: 80%;"]').click()
  })

  it('Redirect to user page', () => {
    cy.get('.redirect-to-profile').click()
    cy.url().should('be.equal', 'http://localhost:3000/profile/luca_mistruzzi')
  })
})

describe('User Profile Page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/profile/luca_mistruzzi')
  })

   it('Should display user info', () => {
    cy.get('.name-input[value=Luca]').should('exist')
    cy.get('.surname-input[value=Mistruzzi]').should('exist')
    cy.get('.email-input[value="luca.mistruzzi@gmail.com"]').should('exist')
    cy.get('.role-input[value="Local guide"]').should('exist')
  })

    it('Set preferences', () => {
    cy.get('.prefLengthRange > div > span[style="left: 80%;"]').click()
    cy.get('.prefAscentRange > div > span[style="left: 60%;"]').click()
    cy.get('.prefExpTimeRange > div > span[style="left: 80%;"]').click()
  })
})