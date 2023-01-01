describe('hutform e2e tset', () => {
    beforeEach(() => {
        cy.login('francescofio99@gmail.com', '12345678')
    })

    afterEach(() => {
        cy.logout();
    })

    it('the form is empty', () => {
        cy.contains('New Park').click()
        cy.contains('Submit form').click()
        cy.contains('Please insert')
    });

    it('all info exist', () => {
        cy.contains('New Park').click()
        cy.contains('Name')
        cy.contains('Number of lots')
        cy.contains('Opening time')
        cy.contains('Closing time')
        cy.contains('Country')
        cy.contains('Region')
        cy.contains('City')
        cy.contains('Description')
    });

    it('exit button test', () => {
        cy.contains('New Park').click()
        cy.contains('Exit without saving').click()
        cy.url().should('include', '/')
    });

    it('submit form validation', () => {
        cy.contains('New Park').click()
        cy.contains('Submit form').click()
        cy.contains('Please insert')
    });

    it('submit form', () => {
        cy.contains('New Park').click()
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
        cy.contains('Please select a position on the map!')
        cy.contains('Save position').click()
        cy.contains('Submit form').click()
        cy.contains('saved successfully')
        cy.contains('Close').click()
    });


});