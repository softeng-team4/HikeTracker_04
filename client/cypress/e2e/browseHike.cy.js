describe('Browse Hikes', () => {

  it('Select city', () => {
    cy.visit("http://localhost:3000/");
    cy.get('.CountrySelection').select("Italy")
    cy.get('.RegionSelection').select("Piedmont")
    cy.get('.CitySelection').select("Bussoleno")
    cy.get('.button-geoArea').click()
    cy.get(".card").should("have.length", 2)
    cy.contains("Punta Ciangari from Bussoleno")
    cy.contains("Balmafol - west")
  })

  it('Select difficulty: hiker', () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Hiker').click()
    cy.get(".card").should("have.length", 4)
    cy.contains("Guglia Ross")
    cy.contains("Loop: Bussoleno-Bruzolo-Pavaglione-Falcemagna-Foresto")
    cy.contains("Bivacco Piero Vacca")
    cy.contains("Piero Vacca Bivouac")
  })

  it('Select difficulty: tourist', () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Tourist').click()
    cy.get(".card").should("have.length", 4)
    cy.contains("Col Clapier from Val Clarea")
    cy.contains("Punta Ciangari from Bussoleno")
    cy.contains("test")
    cy.contains("Colle delle Coupe")
  })

  it('Select difficulty: pro hiker', () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Pro Hiker').click()
    cy.get(".card").should("have.length", 4)
    cy.contains("Gran Serin dal Frais")
    cy.contains("Loop Bardonecchia - Lago Verde")
    cy.contains("Colle del Nivolet")
    cy.contains("Balmafol - west")
  })

  it("Select  difficulty and length", () => {
    cy.reload()
    cy.contains('Pro Hiker').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 4)
    cy.contains("Gran Serin dal Frais")
    cy.contains("Loop Bardonecchia - Lago Verde")
    cy.contains("Colle del Nivolet")
    cy.contains("Balmafol - west")
  })

  it("Select  difficulty and time", () => {
    cy.reload()
    cy.contains('Pro Hiker').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 3)
    cy.contains("Gran Serin dal Frais")
    cy.contains("Loop Bardonecchia - Lago Verde")
    cy.contains("Balmafol - west")
  })

  it("Select  difficulty and ascent", () => {
    cy.reload()
    cy.contains('Hiker').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 4)
    cy.contains("Guglia Ross")
    cy.contains("Loop: Bussoleno-Bruzolo-Pavaglione-Falcemagna-Foresto")
    cy.contains("Bivacco Piero Vacca")
    cy.contains("Piero Vacca Bivouac")
  })

  it("Select length and ascent", () => {
    cy.reload()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(".card").should("have.length", 4)
    cy.contains("Col Clapier from Val Clarea")
    cy.contains("Punta Ciangari from Bussoleno")
    cy.contains("Guglia Ross")
    cy.contains("Gran Serin dal Frais")
  })  

  it("Select length and time", () => {
    cy.reload()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 60%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(".card").should("have.length", 4)
    cy.contains("Col Clapier from Val Clarea")
    cy.contains("Punta Ciangari from Bussoleno")
    cy.contains("test")
    cy.contains("Gran Serin dal Frais")
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
    cy.get(".card").should("have.length", 2)
    cy.contains("Loop Bardonecchia - Lago Verde")
    cy.contains("Colle del Nivolet")
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