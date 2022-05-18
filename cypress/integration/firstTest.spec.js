//used for intelisence & indicate cypress methods
/// <reference types="cypress"/>  

const { Input } = require("@angular/core")
const { set } = require("core-js/core/dict")

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

    it("then and wrap methods", () => {
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
    
    it("Invoke command",() =>{
        cy.visit("/")
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()

        // Example #1:
        cy.get('[for="exampleInputEmail1"]').should("contain","Email address")

        // Example #2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal("Email address")
        })

        // Example 3 How to get web element through invoke command
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox') // use "." dot infront of it because its a class
            .invoke('attr', 'class')
            // .should('contain', 'checked')
            .then(classvalue => {
                expect(classvalue).to.contain('checked')
            })
    })

    it("Assert property", () => {
        cy.visit('/')
        cy.contains('Forms').click()
        // cy.contains('Form Layouts').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker')
            .find('input').then(input =>{
                cy.wrap(input).click({force:true})  // jquery param thats why we use "wrap()" instead of directly using click()
                cy.get('nb-calendar-picker').contains('17').click()
                cy.wrap(input).invoke('prop', 'value').should('contain', 'May 17, 2022')

            })
           


    })

    it("Radio Button", () => {
       
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)   
               .first()
               .check({force:true})  // checked first but when check second its unchecked
               .should('be.checked')


            cy.wrap(radioButtons)
               .eq(1) //select element through index
               .check({force:true}) // Check second but first unchecked
               
            cy.wrap(radioButtons)  // Verify that first radio button unchecked by checking second radio button
                //.first() // use select first element 
                .eq(0) // inplace of first(), we can use index(0)
                .should('not.be.checked') // ---Passed---

            cy.wrap(radioButtons) // Verify that the third radio button is disabled
            .eq(2) // third index radio button
            .should('be.disabled')  // ---Passed---

            cy.wrap(radioButtons) // Verify that the third radio button is not disabled
            .eq(2) // third index radio button
            .should('not.be.disabled')  // ---Failed---

        })
    })

    it("CheckBoxes", () => {

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({force:true}) //Check() method checked all the checkboxes if already checked then it don't uncheck
         
        // to uncheck the already check checkboxes we can use click()
        cy.get('[type="checkbox"]').eq(0).click({force:true})
        
        //to check the second unchecked checkbox
        cy.get('[type="checkbox"]').eq(1).check({force:true})

    })

    it("List and drop downs", () => {

        cy.visit('/')
         //-----------------------------Example #1:-------------------------------------
        //Light, dropdown option 1------------------------
        // cy.get('nav nb-select').click()
        // cy.get('nb-option').eq(0).click() 
        // cy.get('.options-list').contains("Light").click()  // use "." dot because its class value [other method]
        // cy.get('nav nb-select').should('contain', "Light")  //Assertion
        // cy.get('nb-layout-header nav').should('have.css','background-color', 'rgb(255, 255, 255)')  // to verify that the color change matches or not

        //Dark , dropdown option 2----------------------
        // cy.get('nb-option').eq(1).click() 
        // cy.get('.options-list').contains("Dark").click()    // use "." dot because its class value [other method]
        // cy.get('nav nb-select').should('contain', "Dark")  //Assertion
        // cy.get('nb-layout-header nav').should('have.css','background-color', 'rgb(34, 43, 69)')  // to verify that the color change matches or not

        //Cosmic, dropdown option 3-------------------------
        // cy.get('nb-option').eq(2).click() 
        // cy.get('.options-list').contains(" Cosmic").click()  // use "." dot because its class value [other method]
        // cy.get('nav nb-select').should('contain', "Cosmic")  //Assertion
        // cy.get('nb-layout-header nav').should('have.css','background-color', 'rgb(50, 50, 89)')  // to verify that the color change matches or not

        //Corporate, dropdown option 4-----------------------
        // cy.get('nb-option').eq(3).click() 
        // cy.get('.options-list').contains(" Corporate").click() // use "." dot because its class value [other method]
        // cy.get('nav nb-select').should('contain', "Corporate")  //Assertion
        // cy.get('nb-layout-header nav').should('have.css','background-color', 'rgb(255, 255, 255)')  // to verify that the color change matches or not


    //    --------------Example #2:To avoid above duplication of code==============
       cy.get('nav nb-select').then(dropdown => {
           cy.wrap(dropdown).click()
           cy.get('.options-list nb-option').each( (listItem, index) => { //each() used for each drop down items, index for creating condition
               const itemText = listItem.text().trim()   // use trim() to remove extra space into the string, text() to get item text

            //    Json object for colors
               const colors = {
                   "Light": "rgb(255, 255, 255)",
                   "Dark": "rgb(34, 43, 69)",
                   "Cosmic": "rgb(50, 50, 89)",
                   "Corporate": "rgb(255, 255, 255)"
               }
               
               cy.wrap(listItem).click() // to click on listitem
               cy.wrap(dropdown).should('contain', itemText)  //Assertion dropdown should contain itemText
               cy.get('nb-layout-header nav').should('have.css','background-color', colors[itemText]) // Assertion, to check after clciking header BG color match or not
               if(index <3){
                cy.wrap(dropdown).click() // to click dropdown for iteration
               }

           })
       })
    
    })

    it("Web tables", () =>{
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
     // Example 1: tbody = table body, tr = table row | How to update the table a row value and search the updated value
        // cy.get('tbody').contains('tr','Larry').then(tableRow =>{
        //     cy.wrap(tableRow).find('.nb-edit').click({force:true}) //use "." dot because its a class value
        //     cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25') // clear(alrady entered value, & add/ type new value as '25')
        //     cy.wrap(tableRow).find('.nb-checkmark').click({force:true}) // click on update/checkmar button
            
            // Way 1: find the table data cell by index eq() method ,Assertion, Verify that new updated value is '25'
            // cy.wrap(tableRow).find('td').eq(6).should('contain', '25') 
            // way 2: add custom web element locator
             //...

        // })

    // ------------------------------------------------------------------------------
      // Example 2 [Way 1]: how to add new row/record with first & last names
      
      // To get the + Add button and click({force:true}) "{force:true}" for covered elements
    //   cy.get('.nb-plus').click({force:true})    
    
    //   cy.get('td').find('[placeholder="First Name"]').type('Anas')
    //   cy.get('td').find('[placeholder="Last Name"]').type('Ansari')
      
    //   cy.get('tr').find('.nb-checkmark').click({force:true})
    //   // Assertion | Verify that the added first name matches with the required first name 
    //   cy.get('tr').find('td').eq(2).should('contain', 'Anas')
    //   // Assertion | Verify that the added last name matches with the required last name 
    //   cy.get('tr').find('td').eq(3).should('contain','Ansari')
    // -------------------------------------------------------------------

    //  Example #2 [way 2]: how to add new row/record with first & last names
      // Click on Add + record button
      cy.get('thead').find('.nb-plus').click({force:true}) 
      // Enter a new record with First & Last Names
      cy.get('thead').find('tr').eq(2).then( tableRow => {
          cy.wrap(tableRow).find('[placeholder="First Name"]').type("Hassan")
          cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Ali')
          cy.wrap(tableRow).find('.nb-checkmark').click({force:true})
      })
      // Assertion | Verify/Match the entered First & Last Names
      cy.get('tbody tr').find('td').then(tableColumns => {
          cy.wrap(tableColumns).eq(2).should('contain', 'Hassan')
          cy.wrap(tableColumns).eq(3).should('contain', 'Ali')
      }) 
    // Example #3 [way 1] ------------------
      // Filter Table results by 'Age'
    //   cy.get('thead [placeholder="Age"]').type('20')
     // Add wait of half second for table results to be filtered & visible 
    //   cy.wait(500)
      // Assertion | find all the table rows that have Age = 20 index eq(6)
    //   cy.get('tbody tr').each(tableRows => {
        //   cy.wrap(tableRows).find('td').eq(6).should('contain','20')
    //   })
    // Example #3 [way 2] ..................
    const age = [20, 30, 40, 200]
    cy.wrap(age).each(age => {
        cy.get('thead [placeholder="Age"]').clear().type(age)

       cy.wait(500)

       cy.get('tbody tr').each(tableRows =>{
           if(age == 200){
              cy.wrap(tableRows).should('contain', 'No data found')
           }
           else {
            cy.wrap(tableRows).find('td').eq(6).should('contain', age)
           }
          
       })

    })

    })

    it.only("Web Datepickers", () => {
        // recursive function declaration  
        function selectDayfromCurrent(day){

            // dynamic date selection handling
            let date =new Date()  // variable initiation
            date.setDate(date.getDate() + day)      // getDate() [will get the current date] + [num] means the date will be [num] days from the current date
            let futureDay = date.getDate()   // getDay() will return number of Day date i.e 27 
            //  let futureMonth = date.getMonth()   // getmonth() will return number of month
            let futureMonth = date.toLocaleString('default', {month: 'short'}) // this line will return the month & its short form i.e Dec
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear() // to match the input field date format
            
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                
                if(!dateAttribute.includes(futureMonth)){   // navigate tab short month don't include current month
                    cy.get('[data-name="chevron-right"]').click() // click on datepicker > button
                    // cy.get('nb-calendar-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    selectDayfromCurrent()  // for iteration
                }else {
                    // select active date from date picker calender section that contain current day date
                    cy.get('nb-calendar-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        } 


        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        // To click on Common datepicker input field
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input =>{
            cy.wrap(input).click({force:true})  // To click on Common datepicker input field

        let dateAssert = selectDayfromCurrent(5) //Function call        
              

        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)

        })

    })
})
