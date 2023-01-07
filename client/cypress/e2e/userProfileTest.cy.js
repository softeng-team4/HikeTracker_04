before(() => {
  cy.visit('http://localhost:3000/')
  // cy.contains('Sign In').click()
  // cy.url().should('include', '/login')
  // cy.get('.email-input').clear()
  // cy.get('.password-input').clear()
  // cy.get('.email-input').clear().type('masterale1999@gmail.com')
  // cy.get('.password-input').clear().type('password')
  // cy.get('.loginbtn').click()
  // cy.go("back")
  cy.login('masterale1999@gmail.com', 'password')
})

after(() => {
  cy.logout();
})

describe('User Profile Open Offcanvas', () => {

  it('open user profile canvas', () => {
    cy.visit('http://localhost:3000/')
    cy.login('masterale1999@gmail.com', 'password')
    cy.get('.userDropdownButton').click()
    cy.contains('My Profile').click()
  })
})

describe('User Profile Offcanvas', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('.userDropdownButton').click()
    cy.contains('My Profile').click()
  })

  it('Close user profile canvas', () => {
    cy.get('.btn-close').click()
  })

  it('Should display user info', () => {
    cy.get('.offcanvas-body > .card > .card-header > .card-title').contains('Master Ale')
    cy.get('.offcanvas-body > .card > .card-body').contains('Email: masterale1999@gmail.com')
    cy.get('.offcanvas-body > .card > .card-body').contains('Role: Hiker')
  })

  it('Submit button disabled', () => {
    cy.get('.btn-success').should('be.disabled')
  })

  it('Set preferences', () => {
    cy.get('.prefLengthRange > div > span[style="left: 80%;"]').click()
    cy.get('.prefAscentRange > div > span[style="left: 40%;"]').click()
    cy.get('.prefExpTimeRange > div > span[style="left: 80%;"]').click({force: true})
  })

  it('Redirect to user page', () => {
    cy.get('.redirect-to-profile').click()
    cy.url().should('be.equal', 'http://localhost:3000/profile/master_ale')
  })
})

describe('User Profile Page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/profile/master_ale')
  })

  it('Should display user info', () => {
    cy.get('.name-input[value=Master]').should('exist')
    cy.get('.surname-input[value=Ale]').should('exist')
    cy.get('.email-input[value="masterale1999@gmail.com"]').should('exist')
    cy.get('.role-input[value="Hiker"]').should('exist')
  })

  it('Set preferences', () => {
    cy.get('.prefLengthRange > div > span[style="left: 80%;"]').click()
    cy.get('.prefAscentRange > div > span[style="left: 40%;"]').click()
    cy.get('.prefExpTimeRange > div > span[style="left: 80%;"]').click({force: true})
  })
})

