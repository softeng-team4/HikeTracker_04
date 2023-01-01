describe('loginhikeform e2e tset', () => {

  it('sign in button test',()=>{
    cy.visit('http://localhost:3000/')
    cy.contains('Sign In').click()
    cy.url().should('include', '/login')
  })

  it('wrong login with empty account',()=>{
    cy.visit('http://localhost:3000/login')
    cy.get('.loginbtn').click()
    cy.contains('Invalid email address.')
  })

  it('wrong login with wrong info',()=>{
    cy.login('dqy0828@gmail.com','1234567')
    cy.contains('Error')
  })

  it('wrong login with account does not exist',()=>{
    cy.login('dqy@gmail.com','12345678')
    cy.contains('Error')
  })

  it('login form test',()=>{
    cy.login('dqy0828@gmail.com','123456789')
    cy.url().should('include', '/')
    cy.logout()
  })

})

describe('hikeform e2e test', () => {
  beforeEach(() => {
    cy.login('aleganino@gmail.com', 'password')
  })

  afterEach(()=>{
    cy.logout();
  })

  it('all info exist',()=>{
    cy.contains('New Hike').click()
    cy.contains('Add A New Hike')
    cy.contains('Title')
    cy.contains('Length')
    cy.contains('Expected time')
    cy.contains('Ascent')
    cy.contains('Difficulty')
    cy.contains('Country')
    cy.contains('Region')
    cy.contains('City')
    cy.contains('Description')
  })

  it('exit button test',()=>{
    cy.contains('New Hike').click()
    cy.contains('Exit without saving').click()
    cy.url().should('include', '/')
  })

  it('submit form validation',()=>{
    cy.contains('New Hike').click()
    cy.contains('Please insert')

  })

  it('submit form', () => {
    cy.contains('New Hike').click()
    cy.get('.title-input').type('e2e test').should('have.value', 'e2e test')
    cy.get('.expTime-input').type('344').should('have.value', '344')
    cy.get('.difficulty-input').select('Hiker').should('have.value', 'Hiker')
    cy.get('.country-input').select('IN').should('have.value', 'IN')
    cy.get('.region-input').select('TG').should('have.value', 'TG')
    cy.get('.city-input').select('Bodhan').should('have.value', 'Bodhan')
    cy.get('.file-upload').click()
    cy.get("input[type='file']").attachFile('test.gpx')
    cy.get('.length-input').should('have.value', '5694.10')
    cy.get('.ascent-input').should('have.value', '177.09')
    cy.get('.description-input').type('e2e test').should('have.value', 'e2e test')
    cy.contains('Latitude')
    cy.contains('Longitude')
    cy.contains('Altitude')
    cy.contains('Start point')
    cy.contains('End point')
    cy.contains('Submit form').click()
    cy.contains('Close').click()
  })

})

