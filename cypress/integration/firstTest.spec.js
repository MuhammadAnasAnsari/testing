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

    it("its second test", () => {

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

           /// cy.find("nb-checkbox") // should only be used only for child elements inside parents
          // cy.find('button' )
        
        cy.contains('nb-card','Horizontal form').find('[id="inputEmail3"]')
        cy.contains('nb-card','Horizontal form').find('[id="inputPassword3"]','[type="password"]')

           

    })

    it.only("then and wrap methods", () => {
        cy.visit("/")
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()
        
        // // find the "Email" label from the form "Horizontal form"
        // cy.contains("nb-card", "Horizontal form").find('[for="inputEmail3"]').should("contain", "Email")
        // // find the "Password" label from the form "Horizontal form"
        // cy.contains("nb-card", "Horizontal form").find('[for="inputPassword3"]').should("contain", "Password")
        
        // // find the "Email" label from the "Using the Grid"
        // cy.contains("nb-card", "Using the Grid").find('[for="inputEmail1"]').should("contain", "Email")
        // // find the "Passowrd" label from the "Using the Grid"
        // cy.contains("nb-card", "Using the Grid").find('[for="inputPassword2"]').should("contain", "Password")

        // // find the "Email address" label from the form "Basic form"
        // cy.contains("nb-card", "Basic form").find('[for="exampleInputEmail1"]').should("contain", "Email address")
        // // find the "Password" label from the form "Basic form"
        // cy.contains("nb-card", "Basic form").find('[for="exampleInputPassword1"]').should("contain", "Password")

        //-------------------Selenium style of defining object to reduce duplication---------------------
        // const firstForm = cy.contains("nb-card", "Horizontal form")
        // const secondForm = cy.contains("nb-card", "Using the Grid")
        // const thirdForm = cy.contains("nb-card", "Basic form")

        // firstForm.find('[for="inputEmail3"]').should("contain", "Email")
        // secondForm.find('[for="inputEmail1"]').should("contain", "Email")
        // thirdForm.find('[for="exampleInputEmail1"]').should("contain", "Email address")

        //-------------Cypress then() jquery object & text() for assertion matching----------
        cy.contains("nb-card", "Horizontal form").then( firstForm =>{
            
            // Jquery format
            const emaillabelFirst = firstForm.find('[for="inputEmail3"]').text()
            const passwordlabelFirst = firstForm.find('[for="inputPassword3"]').text()
            // Assertion method expect() [chai library], used with jquery format like then()
            expect(emaillabelFirst).to.equal("Email")
            expect(passwordlabelFirst).to.equal("Password")


            cy.contains("nb-card", "Using the Grid").then( secondForm => {
               
                //Jquery format
                const emaillabelSecond = secondForm.find('[for="inputEmail1"]').text()
                const passwordlabelSecond = secondForm.find('[for="inputPassword2"]').text()
                // Assertion email label of first form is to equal to email label of second form
                expect(emaillabelFirst).to.equal(emaillabelSecond)
                // Assertion password label of first form is equal to password label of second form
                expect(passwordlabelFirst).to.equal(passwordlabelSecond)

                

                cy.contains("nb-card", "Basic form").then( thirdForm => {
                    const emaillabelThird = thirdForm.find('[for="exampleInputEmail1"]').text()
                    //Assertion Email label of second form is equal to the email label of third form
                    // expect(emaillabelSecond).equals(emaillabelThird)
                    // ------Failed because Email != Email address-------------

                    // to back convert Cypress format, use wrap() method
                    cy. wrap(firstForm).find('[for="inputEmail3"]').should("contain", "Email")



                })
   
            })
            
             

        })


    })

})
