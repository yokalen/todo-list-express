const deleteBtn = document.querySelectorAll('.fa-trash') //create variable and assign it to all elements with the class fa-trash
const item = document.querySelectorAll('.item span') //create variable and assign it to all span elements with a parent in the item class
const itemCompleted = document.querySelectorAll('.item span.completed') //create variable and assign it to all spans with a parent in item class that have been marked completed

Array.from(deleteBtn).forEach((element)=>{ //creating an array of all deleteBtn and starting a loop
    element.addEventListener('click', deleteItem) //listen for click and then run deleteItem function
})//close loop

Array.from(item).forEach((element)=>{ //create an array of item variables and start a loop
    element.addEventListener('click', markComplete) //listen for click and then run markComplete function
})//close loop

Array.from(itemCompleted).forEach((element)=>{ //create an array of itemCompleted variables and start a loop
    element.addEventListener('click', markUnComplete) //listen for click and then run markUncomplete function
})//close loo[]

async function deleteItem(){ //create a deleteItem function that gets handed off
    const itemText = this.parentNode.childNodes[1].innerText //create a variable that stores the text of the item
    try{ //do this if possible
        const response = await fetch('deleteItem', { // create a response function that will delete an item
            method: 'delete', //use delete method
            headers: {'Content-Type': 'application/json'}, //type of data
            body: JSON.stringify({ //create a string from json data
              'itemFromJS': itemText //this is the data we will delete
            })//end of string from json
          })//end of our response function
        const data = await response.json() //create a variable to hold the response 
        console.log(data)//print that data to the console
        location.reload()//refresh the page

    }catch(err){ //do this if what we tried first did not work
        console.log(err)//print the error to the console
    } //end of the error response
} //end of the delete item function

async function markComplete(){ //create an async markComplete function 
    const itemText = this.parentNode.childNodes[1].innerText //create a variable to store the text of the item
    try{ //do this if possible
        const response = await fetch('markComplete', { //create a response variable that waits for the results of fetch
            method: 'put', //update existing data
            headers: {'Content-Type': 'application/json'}, //type of data is json
            body: JSON.stringify({ //turn json into string
                'itemFromJS': itemText //this is data we will update
            })//end of string
          })//end of response
        const data = await response.json() //updated data in json
        console.log(data) //print update to console
        location.reload() //reload page

    }catch(err){ //do this if what we tried had an error
        console.log(err) //print the error
    } //end of the error response
}// end of mark complete function

async function markUnComplete(){ //create an async markUnComplete function 
    const itemText = this.parentNode.childNodes[1].innerText //create a variable to store the text of the item
    try{ //do this if possible
        const response = await fetch('markUnComplete', { //create a response variable that waits for the results of fetch
            method: 'put', //update existing data
            headers: {'Content-Type': 'application/json'}, //type of data is json
            body: JSON.stringify({ //turn json into string
                'itemFromJS': itemText //this is data we will update
            }) //end of string
          }) //end of response
        const data = await response.json() //updated data in json
        console.log(data) //print update to console
        location.reload() //reload page

    }catch(err){ //do this if what we tried had an error
        console.log(err) //print the error
    } //end of the error response
} // end of mark uncomplete function