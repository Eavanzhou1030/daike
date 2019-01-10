const koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.mongodb, {useNewUrlParser: true}, (err) => {
  if(err) {
    console.log('mongodb is connected failed')
  } else {
    console.log('mongodb is connected successfully')
  }
})

const app = new koa()
app.use(cors({
  origin: function(ctx) {
    return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))
app.use(bodyParser())

const user_router = require('./routes/user_router')
const example_router = require('./routes/example_router')
const school_router = require('./routes/school_router')
const course_router = require('./routes/course_router')

app.use(user_router.routes()).use(user_router.allowedMethods())
app.use(example_router.routes()).use(example_router.allowedMethods())
app.use(school_router.routes()).use(school_router.allowedMethods())
app.use(course_router.routes()).use(course_router.allowedMethods())

app.listen(config.port)