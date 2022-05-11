//used for intelisence & indicate cypress methods
/// <reference types="cypress"/>  


// context() or describe() both are same
describe("My first test suite", () => {
 
    it("first test", () => {
        // In order to open our application in the Cypress
        cy.visit("/")
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
       
        // by Tag Name
         cy.get('input')
       
         // by ID, to specify the ID use '#' at start of value
         cy.get("#inputEmail")
 
         // by Class Name, to specify the Class use '.' at the start of value
         cy.get('.input-full-width')
 
         // by Attribute Name, to specify the attribute use '[]' and place value inside
         cy.get('[placeholder]')
 
         // by Attribute name and value, to specify use '[]' and place attribute & its value inside
         cy.get('[placeholder="Email"]')
 
         // by CLass Value, to specify use '[]' and place Class & its entire value/string inside
         cy.get('[class="input-full-width size-medium shape-rectangle"]')
 
         // by Tag Name and Attribute with value
         cy.get('input[placeholder="Email"]')
 
         // by two different attributes
         cy.get('input[placeholder="Email"][type="email"][fullwidth]')
 
         // by Tag Name, Attribute with value, ID and Class name
         cy.get('input[placeholder="Email"]#inputEmail.input-full-width')
 
         // The most Recommended way by Cypress [add your own attributes/locator Best Way
         cy.get('[data-cy="imputEmail1"]')
    })

    it.only("its second test", () => {

        cy.visit('/');
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()

        cy.get('[data-cy="sign-in-Btn"]') // by custom attribute
        cy.contains('Sign in')  // by text

        cy.contains('[status="warning"]',"Sign in")
        
        // get the form button from bottom to top approach
        cy.get('#inputEmail3') // get element by ID
           .parents('form') // top section
           .find('button') // use find() to find th specified section child element but the get() gets all the elements
           .should('contain','Sign in') // Assertion
           .parents('form')
           .find("nb-checkbox")
           .click({force:true}) // use {force: true} for hidden CSS Property

           /// cy.find("nb-checkbox") // should only be used for child elements

           

           

    })

})
