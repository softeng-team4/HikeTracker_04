describe('hikeform e2e tset', () => {
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

