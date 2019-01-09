const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ExampleSchema = new Schema({
  msg: {
    type: String,
    require: true
  }
}, {collation: 'example', versionKey: false})

module.exports = mongoose.model('example', ExampleSchema)