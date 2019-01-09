const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SchoolSchema = new Schema({
  Id: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  website: {
    type: String
  },
  level: {
    type: String
  },
  abbreviation: {
    type: String
  },
  provinceId: {
    type: String
  },
  city: {
    type: String
  }

}, {collection: 'universities', versionKey: false})

module.exports = mongoose.model('universities', SchoolSchema)
