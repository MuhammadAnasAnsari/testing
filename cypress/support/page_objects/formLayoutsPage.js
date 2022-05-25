
export class FormLayoutsPage{

submitInlineFormWithNameAndEmail(name, email){
    cy.contains('nb-card', 'Inline form').find('form').then(form =>{
        cy.wrap(form).find('[placeholder="Jane Doe"]').clear({force:true}).type(name)
        cy.wrap(form).find('[placeholder="Email"]').type(email)
        // cy.wrap(form).find('[class="label"]').click()
        cy.wrap(form).find('[type="checkbox"]').check({force:true}) //check() can be called with form the type checkbox
        cy.wrap(form).submit()   // submit() method can only be use for Forms
        //cy.wrap(form).get('button').contains('Submit').click()
    })
    
}

submitBasicFormWithEmailAndPassword(email, password){
    cy.contains('nb-card', 'Basic form').find('form').then(form =>{
        cy.wrap(form).find('[placeholder="Email"]').type(email)
        cy.wrap(form).find('[placeholder="Password"]').type(password)
        cy.wrap(form).find('[type="checkbox"]').check({force:true})
        cy.wrap(form).submit()
    })

}

}

export const onFormLayoutsPage   = new FormLayoutsPage()