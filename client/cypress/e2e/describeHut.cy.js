describe('hutform e2e tset', () => {

    beforeEach(() => {
        cy.login('francescofio99@gmail.com', '12345678')
    })

    afterEach(() => {
        cy.logout();
    })

    it('all info exist', () => {
        cy.contains('New Hut').click()
        cy.contains('Name')
        cy.contains('Email')
        cy.contains('Phone number')
        cy.contains('Optional website')
        cy.contains('Altitude')
        cy.contains('Number of beds')
        cy.contains('Country')
        cy.contains('Region')
        cy.contains('City')
        cy.contains('Description')
    });

    it('exit button test', () => {
        cy.contains('New Hut').click()
        cy.contains('Exit without saving').click()
        cy.url().should('include', '/')
    });


    it('submit form validation', () => {
        cy.contains('New Hut').click()
        cy.contains('Submit form').click()
        cy.contains('Please insert')
    });

    it('submit form', () => {
        cy.contains('New Hut').click()
        cy.get('.name-input').type('e2e test').should('have.value', 'e2e test')
        cy.get('.email-input').type('e2e@test.com').should('have.value', 'e2e@test.com')
        cy.get('.phone-input').type('1234567890').should('have.value', '1234567890')
        cy.get('.website-input').type('https://e2etest.com').should('have.value', 'https://e2etest.com')
        cy.get('.altitude-input').type('540').should('have.value', '540')
        cy.get('.beds-input').type('12').should('have.value', '12')
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


    it('the form is empty', () => {
        cy.contains('New Hut').click()
        cy.contains('Submit form').click()
        cy.contains('Please insert')
    });
});

