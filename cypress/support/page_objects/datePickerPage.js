import { Input } from "@angular/core"

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
            cy.get('[data-name="chevron-right"]').click({force:true}) // click on datepicker > button
            // cy.get('nb-calendar-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
            selectDayfromCurrent(day)  // for iteration
        }else {
            // select active date from date picker calender section that contain current day date
            // cy.get('nb-calendar-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    })
    return dateAssert
} 


export class Datepickerpage{

    selectCommonDatepickerDateFromToday(dateFromToday){

        // To click on Common datepicker input field
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input =>{
            cy.wrap(input).click({force:true})  // To click on Common datepicker input field

        let dateAssert = selectDayfromCurrent(dateFromToday) //Variable to assert        
              

        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)

        })

     }

    selectDatepickerWithRangeFromToday(firstDay, secondDay){
      // To click on "Datepicker With Range" input field
      cy.contains('nb-card', 'Datepicker With Range').find('input').then(input =>{
        cy.wrap(input).click()  // To click on Datepicker With Range input field

    let dateAssertFirst = selectDayfromCurrent(firstDay) //Variables to assert         
    let dateAssertSecond = selectDayfromCurrent(secondDay)
    const finalDate = dateAssertFirst+' - '+dateAssertSecond
    
    cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)

    })

    } 

}


export const onDatepickerPage =  new Datepickerpage()