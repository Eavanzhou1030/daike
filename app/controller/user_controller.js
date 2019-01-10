const config = require('../../config')
const passport = require('../utils/passport')
const User_col = require('../model/user')
const Password_Col = require('../model/password')
const uuidv1 = require('uuid/v1')

const get = async (ctx, next) => {
  ctx.status = 200
  ctx.body = {
    msg: 'get request!!',
    data: {
      data: ctx.request.query
    }
  }
}

const post = async (ctx, next) => {
  ctx.status = 200
  ctx.body = {
    msg: 'post request!!',
    data: {
      data: ctx.request.query
    }
  }
}

const login = async (ctx, next) => {
  const req = ctx.request.body
  
  const user = User_col.findOne({
    account: req.account
  }, {
    __v: 0,
    _id: 0
  })

  if(!user) {
    ctx.status = 200
    ctx.body = {
      code: -1,
      msg: 'account or password error'
    }
    return
  }

  const userId = user.userId

  const pass = await Password_Col.findOne({
    userId
  }, {
    hash: 1
  })

  const match = await passport.validate(req.password, pass.hash)
  ctx.status = 200
  if(!match) {
    ctx.body = {
      code: -1,
      msg: 'password is error'
    }
  } else {
    ctx.body = {
      code: 1,
      msg: 'login success',
      data: user
    }
  }
}

const register = async (ctx, next) => {
  const req = ctx.request.body

  const user = await User_col.findOne({
    account: req.account
  })

  ctx.status = 200
  if(user) {
    ctx.body = {
      code: -1,
      msg: '用户名重复'
    }
    return
  }

  const userId = uuidv1()
  const newUser = await User_col.create({
    userId,
    account: req.account
  })

  if(newUser) {
    const hash = await passport.encrypt(req.password, config.saltTimes)
    const result = await Password_Col.create({
      userId: userId,
      hash
    })
    if(result) {
      ctx.body = {
        code: 1,
        msg: '注册成功！',
        data: {
          userId: newUser.userId,
          account: newUser.account
        }
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }

}

const updateUserInfo = async (ctx, next) => {
  const req = ctx.request.body

  const result = await User_col.updateOne({
    userId: req.userId
  }, req)

  ctx.status = 200
  if(result.nModified == 1) {
    ctx.body = {
      code: 1,
      msg: 'save successed!'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'save failed!'
    }
  }
}

module.exports = {
  get,
  post,
  login,
  register,
  updateUserInfo
}