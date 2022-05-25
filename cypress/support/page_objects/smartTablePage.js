
export class SmartTable{

    updateAgeByFirstName(name, age){
        //  Example 1: tbody = table body, tr = table row | How to update the table a row value and search the updated value
        cy.get('tbody').contains('tr',name).then(tableRow =>{
            cy.wrap(tableRow).find('.nb-edit').click({force:true}) //use "." dot because its a class value
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age) // clear(alrady entered value, & add/ type new value as '25')
            cy.wrap(tableRow).find('.nb-checkmark').click({force:true}) // click on update/checkmar button
            
            // find the table data cell by index eq() method ,Assertion, Verify that new updated value is '25'
            cy.wrap(tableRow).find('td').eq(6).should('contain', age) 
        

        })

    }

    addNewRecordWithFirstAndLastName(firstName, lastName){
        // how to add new row/record with first & last names
      // Click on Add + record button
      cy.get('thead').find('.nb-plus').click({force:true}) 
      // Enter a new record with First & Last Names
      cy.get('thead').find('tr').eq(2).then( tableRow => {
          cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName)
          cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName)
          cy.wrap(tableRow).find('.nb-checkmark').click({force:true})
      })
      // Assertion | Verify/Match the entered First & Last Names
      cy.get('tbody tr').find('td').then(tableColumns => {
          cy.wrap(tableColumns).eq(2).should('contain', firstName)
          cy.wrap(tableColumns).eq(3).should('contain', lastName)
      }) 
    }

    deleteRowByIndex(index){
       const stub = cy.stub()
       cy.on('window:confirm', stub)
        cy.get('tbody tr').eq(index).find('.nb-trash').click({force:true}).then(()=>{   
           expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
       })

    }


}

export const onSmartTablePage = new SmartTable()