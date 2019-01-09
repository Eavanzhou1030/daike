const Router = require('koa-router')
const router = new Router()
const school_controller = require('../app/controller/school_controller')

router.post('/school', school_controller.searchSchoolByName)

module.exports = router