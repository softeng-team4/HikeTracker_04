describe('loginhikeform e2e tset', () => {
  it('1 access the webpage', () => {
    cy.visit('http://localhost:3000/')
  })

  it('sign in button exists',()=>{
    cy.contains('Sign In')
  })
  
  it('sign in button test',()=>{
    cy.contains('Sign In').click()
    cy.url().should('include', '/login')
  })

  it('wrong login with empty account',()=>{
    cy.contains('Login').click()
    cy.contains('Email cannot be empty and password must be at least six character long')
  })

  it('wrong login with wrong info',()=>{
    cy.get('.email-input').clear()
    cy.get('.password-input').clear()
    cy.get('.email-input').type('dqy0828@gmail.com').should('have.value', 'dqy0828@gmail.com')
    cy.get('.password-input').type('12345678').should('have.value', '12345678')
    cy.contains('Login').click()
    cy.contains('Error')
  })

  it('wrong login with account does not exist',()=>{
    cy.get('.email-input').clear()
    cy.get('.password-input').clear()
    cy.get('.email-input').type('s300179@studenti.polito.it').should('have.value', 's300179@studenti.polito.it')
    cy.get('.password-input').type('12345678').should('have.value', '12345678')
    cy.contains('Login').click()
    cy.contains('Error')
  })

  it('login form test',()=>{
    cy.get('.email-input').clear()
    cy.get('.password-input').clear()
    cy.get('.email-input').type('dqy0828@gmail.com').should('have.value', 'dqy0828@gmail.com')
    cy.get('.password-input').type('123456789').should('have.value', '123456789')

    cy.contains('Login').click()
    cy.url().should('include', '/home')

  })

})

describe('hikeform e2e test', () => {
  it('1 access the webpage', () => {
    cy.visit('http://localhost:3000/hikeform')
  })

  it('all info exist',()=>{
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
    cy.contains('Exit without saving').click()
    cy.url().should('include', '/home')
  })

  it('2 access the webpage again', () => {
    cy.visit('http://localhost:3000/hikeform')
  })

  it('submit form validation',()=>{
    cy.contains('Submit form').click()
    cy.contains('Please insert')
  
  })

  it('3 access the webpage again', () => {
    cy.visit('http://localhost:3000/hikeform')
  })

  it('submit form',()=>{
    cy.get('.title-input').type('e2e test').should('have.value', 'e2e test')
    cy.get('.length-input').type('588').should('have.value', '588')
    cy.get('.expTime-input').type('344').should('have.value', '344')
    cy.get('.ascent-input').type('788').should('have.value', '788')
    cy.get('.country-input').select('IN').should('have.value', 'IN')
    cy.get('.region-input').select('TG').should('have.value', 'TG')
    cy.get('.city-input').select('Bodhan').should('have.value', 'Bodhan')
    cy.get('.description-input').type('e2e test').should('have.value', 'e2e test')
    cy.contains('Submit form').click()
  })

})

