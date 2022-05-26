/// <reference types="cypress">

describe("Json objects", ()=>{
    
    it("JSON objects", ()=>{
       cy.openHomePage()
    
       const simpleObject = {"key": "value", "key2": "value2" }

       const simpleArrayOfValues = ["one", "two", "three"]

       const arrayOfObjects = [{ "key1": "value1" }, { "key2": "value2"}, { "key3": "value3"}]

       const typesOfData = {"string": "this is a string", "number": 10}

       const mix = {
           "FirstName": "Anas",
           "LastName": "Ansari",
           "Age": 27,
           "Students": [
               {
                  "firstName": "Sara",
                  "lastName": "Conor"
               },
               {
                   "firstName": "Bruce",
                   "lastName": "Lee"
               }
            ]

       }
    // how to access the objects in console logs
       console.log(simpleObject.key2)
       console.log(simpleObject["key2"])
       console.log(simpleArrayOfValues[1])
       console.log(arrayOfObjects[2].key3)
       console.log(mix.Students[1].lastName)

       const lastNameOfSecondStudent = mix.Students[1].lastName


    })
    
})