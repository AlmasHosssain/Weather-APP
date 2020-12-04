const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { env } = require('process')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/api/history',require('./api/route'))

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
   console.log(`Server is ready to run on the port ${PORT}`)
   mongoose.connect('mongodb://localhost/WeatherApi',({useNewUrlParser : true}),
   ()=>{
      console.log(`Database Connected Successfully..`)
   })
})