const get = async (ctx, next) => {
  ctx.status = 200
  ctx.body = {
    code: 1,
    msg: 'get request'
  }
}

const post = async (ctx, next) => {
  ctx.status = 200
  ctx.body = {
    code: -1,
    msg: 'post request'
  }
}

module.exports = {
  get,
  post
}