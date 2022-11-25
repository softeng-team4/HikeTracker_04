describe('loginhutform e2e tset', () => {
    it('access the webpage', () => {
        cy.visit('http://localhost:3000/')
    });
    
    it('sign in button exists',()=>{
        cy.contains('Sign In')
    });
      
    it('sign in button test',()=>{
        cy.contains('Sign In').click()
        cy.url().should('include', '/login')
    });
    
    it('login form test',()=>{
        cy.get('.email-input').clear()
        cy.get('.password-input').clear()
        cy.get('.email-input').type('francescofio99@gmail.com').should('have.value', 'francescofio99@gmail.com')
        cy.get('.password-input').type('12345678')
    
        cy.contains('Login').click()
        cy.url().should('include', '/home')
    
    });
});

describe('hutform e2e tset', () => {
    it('access the webpage', () => {
        cy.visit('http://localhost:3000/newPark')
    });
  
    it('all info exist',()=>{
        cy.contains('Name')
        cy.contains('Number of lots')
        cy.contains('Opening time')
        cy.contains('Closing time')
        cy.contains('Country')
        cy.contains('Region')
        cy.contains('City')
        cy.contains('Description')
    });
    
    it('exit button test',()=>{
        cy.contains('Exit without saving').click()
        cy.url().should('include', '/home')
    });
  
    it('access the webpage again', () => {
        cy.visit('http://localhost:3000/newPark')
    });
  
    it('submit form validation',()=>{
        cy.contains('Submit form').click()
        cy.contains('Please insert')
    });

    it('access the webpage again', () => {
        cy.visit('http://localhost:3000/newPark')
    });
  
    it('submit form',()=>{
        cy.get('.name-input').type('e2e test').should('have.value', 'e2e test')
        cy.get('.lots-input').type('12').should('have.value', '12')
        cy.get('.cost-input').type('2').should('have.value', '2')
        cy.get('.openingHour-input').type('8').should('have.value', '8')
        cy.get('.openingMinute-input').type('30').should('have.value', '30')
        cy.get('.closingHour-input').type('14').should('have.value', '14')
        cy.get('.closingMinute-input').type('00').should('have.value', '00')
        cy.get('.country-input').select('IN').should('have.value', 'IN')
        cy.get('.region-input').select('TG').should('have.value', 'TG')
        cy.get('.city-input').select('Bodhan').should('have.value', 'Bodhan')
        cy.get('.description-input').type('e2e test').should('have.value', 'e2e test')
        cy.contains('Submit form').click()
    });

    it('position is missing', ()=> {
        cy.contains('Please select a position on the map!')
    });

    it('select a position and submit', () => {
        cy.contains('Save position').click()
        cy.contains('Submit form').click()
    })
  
    it('modal appears, then click on close',()=>{
        cy.contains('saved successfully')
        cy.contains('Close').click()
    });

    it('the form is empty',()=>{
        cy.contains('Submit form').click()
        cy.contains('Please insert')
    });
});


describe('logout e2e tset', () => {
    it('click on logout', () => {
        cy.contains('FRANCESCO').click()
        cy.contains('Sign out').click()
    });
});