const Router = require('koa-router')
const router = new Router()
const example_controller = require('../app/controller/example_controller')

router.get('/example/get',example_controller.get)
router.get('/example/post',example_controller.post)

module.exports = router