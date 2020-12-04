const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historySchema = new Schema({
   icon: String,
   name: String,
   country: String,
   main: String,
   description: String,
   temp: String,
   pressure: String,
   humidity: String,
})

const History = mongoose.model('History', historySchema)
module.exports = History