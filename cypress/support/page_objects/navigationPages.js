
// Useful  function for methods, Responsible to test the state of < icon expanded or collapsed
function selectedGroupMenuItem(groupname){

    cy.contains('a', groupname).then( menu =>{
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr =>{
            if(attr.includes('left')){
                cy.wrap(menu).click()
            }
        })

    })
}

export class NavigationPage{
    formsLayoutsPage(){
        // cy.contains('Forms').click()
        selectedGroupMenuItem('Form')
        cy.contains('Form Layouts').click()
    }

    datePickerPage(){
        // cy.contains('Forms').click()
        cy.contains('Datepicker').click()
    }

    toasterPage(){

        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

    }
    tooltipPPage(){
        cy.contains('Modal & Overlays').click()
       cy.contains('Tooltip').click({force:true})
    }

    smartTablePage(){
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
    }

    

    
       

}

export const navigateTo = new NavigationPage()