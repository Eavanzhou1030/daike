const School_col = require('../model/school')

const searchSchoolByName = async (ctx, next) => {
  const req = ctx.request.body

  const schools = await School_col.find({
    name: new RegExp(req.schoolName)
  }, {
    _id: 0
  }).limit(10)

  ctx.status = 200
  if(schools) {
    ctx.body= {
      code: 1,
      data: schools
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'school is not find'
    }
  }
}

module.exports = {
  searchSchoolByName
}