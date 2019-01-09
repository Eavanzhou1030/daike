const bcrypt = require('bcrypt')

const encrypt = async function(password, saltTimes) {
  const hash = await bcrypt.hash(password, saltTimes)
  return hash
}

const validate = async function(password, hash) {
  const match = await bcrypt.compare(password, hash)
  return match
}

module.exports = {
  encrypt,
  validate
}