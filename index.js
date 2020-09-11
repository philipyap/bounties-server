require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

// <<<<< FORM DATA MIDDLEWARE >>>>>
// allows form data to be processed into req.body
app.use(express.urlencoded({extended: false}))
//tells express to recognize req.body as a json object
app.use(express.json())
app.use(cors())

// create router
app.use('/bounties', require('./controllers/bounties'))

app.get('/', (req, res)=> {
    res.send('You have hit the home route')
})

app.listen(process.env.PORT || 8000, ()=> {
    console.log("yeeee")
})