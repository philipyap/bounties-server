// set up connection

const mongoose = require('mongoose')

//Mongo Connection String
//this will automatically create the db if it doesn't already exist
mongoose.connect(process.env.ATLAS_URI || process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//shortcut to mongoose.connection object
const db = mongoose.connection

//set up event listener to fire once the connection'opens'
//to console.log what host and port it is running on
db.once('open',()=>{
    console.log(`Connected to MongoDb at ${db.host}:${db.port}`)
})

db.on('error', (err)=>{
    console.log(`Database error:\n${err}`)
})

//export all the things
module.exports.Bounty = require('./bounty')