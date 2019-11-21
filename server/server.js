require('../server/config/config');
//**  Node.js body parsing middleware. */ 

const express = require('express')
const mongoose = require('mongoose');
const path = require('path');

const bodyParser = require('body-parser')
const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// Set public folder

app.use(express.static(path.resolve(__dirname, '../public')))

// Global configuration Configuration
app.use(require('./routes/index.js'))


//** Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. */

mongoose.connect('mongodb://localhost:27017/supercafe', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto 3000`)
})