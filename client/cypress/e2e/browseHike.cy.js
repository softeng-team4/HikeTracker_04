describe('Browse Hikes', () => {
  /*it('Browse test 1: success', () => {
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
  })*/

  /*it('Select city', () => {
    cy.visit("http://localhost:3000/");
    cy.get('.CountrySelection').select("Italy")
    cy.get('.RegionSelection').select("Piedmont")
    cy.get('.CitySelection').select("Turin")
    cy.get(".card").should("have.length", 2)
    cy.contains("Superga Ascent")
    cy.contains("Monte dei Cappuccini")
  })*/

  it('Select difficulty: hiker', () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Hiker').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("Strada dei Colli")
  })

  it('Select difficulty: tourist', () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Tourist').click()
    cy.get(".card").should("have.length", 3)
    cy.contains("Superga Ascent")
    cy.contains("Monte dei Cappuccini")
    cy.contains("Visit Milan")
  })

  it('Select difficulty: pro hiker', () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Pro Hiker').click()
    cy.get(".card").should("have.length", 2)
    cy.contains("Mottarone climb from Stresa")
    cy.contains("hike1")
  })

  it("Select  difficulty and length", () => {
    cy.reload()
    cy.contains('Pro Hiker').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 2)
    cy.contains("Mottarone climb from Stresa")
    cy.contains("hike1")
  })

  it("Select  difficulty and time", () => {
    cy.reload()
    cy.contains('Pro Hiker').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("hike1")
  })

  it("Select  difficulty and ascent", () => {
    cy.reload()
    cy.contains('Pro Hiker').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 2)
    cy.contains("Mottarone climb from Stresa")
    cy.contains("hike1")
  })

  it("Select length and ascent", () => {
    cy.reload()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("Mottarone climb from Stresa")
  })  

  it("Select length and time", () => {
    cy.reload()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 60%;"]').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("hike1")
  })  

  it("Select length, ascent and time", () => {
    cy.reload()
    cy.contains('Pro Hiker').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 60%;"]').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 60%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("There are no hikes")
  }) 

  it("Select empty list", () => {
    cy.reload()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("There are no hikes")
  })  
})