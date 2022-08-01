const express = require('express') //use express in this file
const app = express() //create a variable app for express call
const MongoClient = require('mongodb').MongoClient //create a variable for mongodb client to talk to mongodb
const PORT = 2121 //create PORT variable and assign 2121 as port
require('dotenv').config() //use .env file to look for variables


let db, //create variable db
    dbConnectionStr = process.env.DB_STRING, //declaring variable and assign our db connection string to it from .env file
    dbName = 'todo' //create variable dbName and assign a string

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //connect to our database 
    .then(client => { //do this when our db is connected
        console.log(`Connected to ${dbName} Database`) //print to console that we are connected
        db = client.db(dbName) //assign db variable and link our db
    }) //end of what we do once we're connected
    
app.set('view engine', 'ejs') //use ejs with express
app.use(express.static('public')) //use public folder with express
app.use(express.urlencoded({ extended: true })) //use urlencoded method with express
app.use(express.json()) //use json method with express


app.get('/',async (request, response)=>{ //read file when we go to home directory
    const todoItems = await db.collection('todos').find().toArray() //set a variable called todoItems and wait for todos collection to come back as an array
    const itemsLeft = await db.collection('todos').countDocuments({completed: false}) //set variable itemsLeft to the todos that are not completed
    response.render('index.ejs', { items: todoItems, left: itemsLeft }) //render index.ejs as index.html
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
}) //end response to get request for /

app.post('/addTodo', (request, response) => { //create something when we use the /addTodo path
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false}) //insert one item in our database collection todos
    .then(result => { //do this after we update our database
        console.log('Todo Added') //print to console
        response.redirect('/') //reload home page
    }) //end response
    .catch(error => console.error(error)) //if there was an error in the request then print the error
}) //end process of creating a new item in db

app.put('/markComplete', (request, response) => {  //update item when we use markComplete
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ //update one item in db
        $set: { //set property
            completed: true //completed prop to true
          } //end property change
    },{ //update
        sort: {_id: -1}, //change sort order for this item
        upsert: false //prevents insertion if item does not already exist
    }) //end update properties
    .then(result => { //do this once update is done
        console.log('Marked Complete') //print to console
        response.json('Marked Complete') //responsd with json
    }) //end response
    .catch(error => console.error(error)) //do this if error updating

}) //end process of marking complete

app.put('/markUnComplete', (request, response) => { //update item when we use markUnComplete
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ //update one item in db
        $set: { //set property
            completed: false //completed prop to false
          } //end property change
    },{ //update
        sort: {_id: -1}, //change sort order for this item
        upsert: false //prevents insertion if item does not already exist
    }) //end update properties
    .then(result => { //do this once update is done
        console.log('Marked Complete') //print to console
        response.json('Marked Complete') //respond with json
    }) //end response
    .catch(error => console.error(error)) //do this if error updating

}) ////end process of marking uncomplete

app.delete('/deleteItem', (request, response) => { //do this when we use deleteItem path
    db.collection('todos').deleteOne({thing: request.body.itemFromJS}) //delete one thing from our database
    .then(result => { //do this once delete is done
        console.log('Todo Deleted') //print to console
        response.json('Todo Deleted') //respond with json
    }) //end response
    .catch(error => console.error(error)) //do this if error deleting

}) //end delete process

app.listen(process.env.PORT || PORT, ()=>{ //set port that app is listening on
    console.log(`Server running on port ${PORT}`) //print to console
}) //end listening method