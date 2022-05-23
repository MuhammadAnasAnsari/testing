
const { onFormLayoutsPage } = require("../support/page_objects/formLayoutsPage")
const { navigateTo } = require("../support/page_objects/navigationPages")



describe("Test with Page Objects",()=>{  // test suite declaration
    
     beforeEach('open applictaion', ()=>{   // beforeeach hook for every test begin this run 
         cy.visit('/')
     })

     it("Verifying navigations across the pages", ()=>{  //test declaration
        //Page objects calling from NavigationPages predefined functions/methods 
           navigateTo.formsLayoutsPage()  
           navigateTo.datePickerPage()
           navigateTo.toasterPage()
           navigateTo.tooltipPPage()
           navigateTo.smartTablePage()


     })

     it.only("Should submit the Inline form and Basic Form and select tomorrow date in the calender", () =>{
          navigateTo.formsLayoutsPage()
          onFormLayoutsPage.submitInlineFormWithNameAndEmail()

        

     })
})