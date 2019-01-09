const koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const config = require('./config')

const app = new koa()
mongoose.connect(config.mongodb, {useNewUrlParser: true}, (err) => {
  if(err) {
    console.log('mongodb is connected failed')
  } else {
    console.log('mongodb is connected successfully')
  }
})

app.use(cors)
app.use(bodyParser)


app.listen(config.port)
console.log('app is listening at port ', config.port)