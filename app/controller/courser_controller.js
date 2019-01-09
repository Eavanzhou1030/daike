const uuidv1 = require('uuid/v1')
const Course_col = require('../model/course')
const User_col = require('../model/user')
const formatDate = require('../utils/formatDate')

const getCourse = async (ctx, next) => {
  const req = ctx.request.body

  const course = Course_col.find({
    status: req.status
  }, {
    _id: 0
  })

  ctx.status = 200
  if(course) {
    ctx.body = {
      code: 1,
      data: course
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'course is not find'
    }
  }
}

const getCourseByType = async (ctx, next) => {
  const req = ctx.request.body
  const userId = req.userId
  const type = req.type

  ctx.status = 200
  if(!userId || !type) { 
    ctx.body = {
      code: -1,
      msg: '缺少参数！'
    }
  }

  let courses = []
  if(type == 'publish') {
    courses = await Course_col.find({
      publisher: userId
    }, {_id: 0}) 
  } else if(type == 'substitute') {
    courses = await Course_col.find({
      revicer: userId
    }, {_id: 0})
  } else {
    let result = await User_col.find({
      userId
    }, {
      collections: 1,
      _id: 0
    })

    const collections = result.collections

    for(var collection of collections) {
      let course = await Course_col.findOne({
        id: collection
      }, {
        _id: 0
      })

      courses.push(course)
    }
  }

  ctx.body = {
    code: 1,
    data: courses
  }
}

const publishCourse = async (ctx, next) => {
  const uuid = uuid()
  const req = ctx.request.body

  ctx.sttaus = 200
  if(!req.publisher || !req.schoolId || !req.courseTime || !req.coursePlace) {
    ctx.body = {
      code: -1,
      msg: '缺少参数！'
    }
    return
  }

  req.id = uuid
  const result = await Course_col.create(req)

  if(result) {
    ctx.body = {
      code: 1,
      msg: '发布成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '发布失败'
    }
  }
}

const substituteCourse = async (ctx, body) => {
  const req = ctx.request.body

  ctx.status = 200
  if(!req.userId || !req.username) {
    ctx.body = {
      code: -1,
      msg: '缺少参数'
    }
    return
  }

  let course = req.course
  if(req.userId == course.publisher) {
    ctx.body = {
      code: -1,
      msg: '发布者和代课者是同一人'
    }
    return
  }

  const revicer = Course_col.findOne({
    id: course.id
  }, {
    revicer: 1
  })

  if(revicer.revicer) {
    ctx.body = {
      code: -1,
      msg: '被人捷足先登了'
    }
    return
  }

  const result = Course_col.update({
    id: course.id 
  }, {
    $set: {
      status: 'revicered',
      closeTime: formatDate(new Date()),
      revicer: req.userId,
      revicerName: req.username
    }
  })

  if(result.nmodified) {
    ctx.body = {
      code: 1,
      msg: '代课成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '代课失败！'
    }
  }
}

const collectCourse = async (ctx, body) => {
  const req = ctx.request.body
  const userId = req.userId
  const courseId = req.courseId

  ctx.status = 200
  if(!userId || !courseId) {
    ctx.body = {
      code: -1,
      msg: '缺少参数！'
    }
  }

  const result = await User_col.find({
    userId
  }, {
    collections: 1,
    _id: 0
  })

  const collections = result.collections
  if(collections.includes(courseId)) {
    ctx.body = {
      code: -1,
      msg: '已经收藏该课程！'
    }
    return
  }

  collections.push(courseId)

  await User_col.update({
    userId
  }, {
    $set: {
      collections
    }
  })
  
  ctx.body = {
    code: 1,
    msg: '收藏成功'
  }
}


module.exports = {
  getCourse,
  getCourseByType,
  publishCourse,
  substituteCourse,
  collectCourse
}