describe('Browse Hikes', () => {
  it('Browse test 1: success', () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Hiker').click()
    cy.get('.CountrySelection').select("Italy")
    cy.get('.RegionSelection').select("Piedmont")
    cy.get('.CitySelection').select("Turin")
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click();
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click();
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click();
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click();
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click();
  })
})