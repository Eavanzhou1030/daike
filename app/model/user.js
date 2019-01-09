const mongoose = require('mongoose')
var Schema = mongoose.Schema

const UserSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  }, 
  account: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  avatar: {
    type: String
  },
  studentId: {
    type: String
  },
  school: {
    type: String
  },
  schoolId: {
    type: String
  },
  provinceId: {
    type: String
  },
  major: {
    type: String
  },
  college: {
    type: String
  },
  wechat: {
    type: String
  },
  qq: {
    type: String
  },
  collections: {
    type: Array
  }
}, {collection: 'user', versionKey: false})

module.exports = mongoose.model('user', UserSchema)