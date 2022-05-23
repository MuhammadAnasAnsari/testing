
export class FormLayoutsPage{

submitInlineFormWithNameAndEmail(){
    cy.contains('nb-card', 'Inline form').find('form').then(form =>{
        cy.wrap(form).find('[placeholder="Jane Doe"]').clear({force:true}).type('Anas007')
        cy.wrap(form).find('[placeholder="Email"]').type('aa@gmail.com')
        cy.wrap(form).find('[class="label"]').click()
        cy.wrap(form).submit()
        //cy.wrap(form).get('button').contains('Submit').click()
    })
    
}

}

export const onFormLayoutsPage   = new FormLayoutsPage()