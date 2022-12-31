const { FaItalic } = require("react-icons/fa")

describe('Browse Hikes', () => {
  it('Select city', () => {
    cy.visit("http://localhost:3000/");
    cy.get('.CountrySelection').select("Italy")
    cy.get('.RegionSelection').select("Piedmont")
    cy.get('.CitySelection').select("Bussoleno")
    cy.get('.button-geoArea').click()
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(4) > .card > .card-header > .row ').contains("Italy, Piedmont, Bussoleno")
    cy.get(':nth-child(5) > .card > .card-header > .row ').contains("Italy, Piedmont, Bussoleno")
    cy.get(':nth-child(6) > .card > .card-header > .row ').contains("Italy, Piedmont, Bussoleno")
    cy.get(':nth-child(7) > .card > .card-header > .row ').contains("Italy, Piedmont, Bussoleno")
  })

  it('Select difficulty: hiker', () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Hiker').click()
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(1)').contains("Hiker")
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(1)').contains("Hiker")
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(1)').contains("Hiker")
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(1)').contains("Hiker")  
  })

  it('Select difficulty: tourist', () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Tourist').click()
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(1)').contains("Tourist")
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(1)').contains("Tourist")
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(1)').contains("Tourist")
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(1)').contains("Tourist")  
  })

  it('Select difficulty: pro hiker', () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Pro Hiker').click()
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(1)').contains("Professional Hiker")
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(1)').contains("Professional Hiker")
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(1)').contains("Professional Hiker")
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(1)').contains("Professional Hiker")   
  })

  it("Select  difficulty and length", () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Pro Hiker').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(1)').contains("Professional Hiker")
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(1)').contains("Professional Hiker")
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(1)').contains("Professional Hiker")
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(1)').contains("Professional Hiker") 
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
  })

  it("Select  difficulty and time", () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Pro Hiker').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(1)').contains("Professional Hiker")
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(1)').contains("Professional Hiker")
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(1)').contains("Professional Hiker")
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(1)').contains("Professional Hiker")  
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
  })

  it("Select  difficulty and ascent", () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Hiker').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-handle-2').click();
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(1)').contains("Hiker")
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([4-7]\d\d|800) m$/)
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(1)').contains("Hiker")
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([4-7]\d\d|800) m$/)
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(1)').contains("Hiker")
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([4-7]\d\d|800) m$/)
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(1)').contains("Hiker")  
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([4-7]\d\d|800) m$/)
  })

  it("Select length and ascent", () => {
    cy.visit("http://localhost:3000/");
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-handle-2').click().wait(5000)
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-handle-2').click().wait(5000)
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([4-7]\d\d|800) m$/)
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([4-7]\d\d|800) m$/)
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([4-7]\d\d|800) m$/)
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([4-7]\d\d|800) m$/)

  })

  it("Select ascent and time", () => {
    cy.visit("http://localhost:3000/");
    cy.contains('Pro Hiker').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-handle-2').click().wait(5000)
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-handle-2').click().wait(5000)
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 1)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([4-7]\d\d|800) m$/)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
  })

  it("Select length and time", () => {
    cy.visit("http://localhost:3000/");
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
  }) 

  it("Select length, ascent and time", () => {
    cy.visit("http://localhost:3000/");
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-handle-2').click()
    cy.get(':nth-child(1) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-handle-2').click()
    cy.get(':nth-child(2) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 40%;"]').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-handle-2').click()
    cy.get(':nth-child(3) > .rc-slider > .rc-slider-step > [style="left: 80%;"]').click()
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([4-7]\d\d|800) m$/)
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([4-7]\d\d|800) m$/)
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([4-7]\d\d|800) m$/)
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([4-7]\d\d|800) m$/)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
    cy.get(':nth-child(6) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
    cy.get(':nth-child(7) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
  }) 

  it("Select empty list", () => {
    cy.visit("http://localhost:3000/");
    cy.get('.CountrySelection').select("China")
    cy.get('.button-geoArea').click()
    cy.get(".card").should("have.length", 1)
    cy.contains("There are no hikes")
  })
  
  
  it("Select by preferences", () => {
    cy.visit("http://localhost:3000/")
    cy.login("masterale1999@gmail.com","password")
    cy.get("input[type='checkbox']").click()
    cy.get(".card").should("have.length", 4)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(2)').contains(/^Length: (1\d|20)\.\d km$/)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([1-7]\d\d|800) m$/)
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(3)').contains(/^Ascent: ([1-7]\d\d|800) m$/)
    cy.get(':nth-child(4) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
    cy.get(':nth-child(5) > .card > .card-footer > .row > :nth-child(4)').contains(/^Estimated Time: (2[4-9]\d|3\d\d|4[0-7]\d|480) min$/)
    cy.logout()
  })

})