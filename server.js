//exporting express module
const express = require('express');
const bodyParser = require('body-parser');

const app=express();


app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

//exporting mongoose module
const dbConfig=require('./config/db.config');
const mongoose= require('mongoose');
mongoose.Promise = global.Promise;

//connecting to database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//getting response from server
app.get('/',(req,res) => {
    res.json({"message":"WElCome to App"});
});

require('./app/routes/note.routes')(app);

//listening to server
app.listen( 4000 ,()=>{
    console.log("Server is Listening");
});