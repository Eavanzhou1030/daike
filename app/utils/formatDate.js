const formateDate = function(date) {
  var y = date.getFullYear()
  var M = date.getMonth() + 1
  M = M < 10 ? '0' + M : M
  var D = date.getDate()
  D = D < 10 ? '0' + D : D
  var h = date.getHours()
  h = h < 10 ? '0' + h : h
  var m = date.getMinutes()
  m = m < 10 ? '0' + m : m
  var s = date.getSeconds()
  s = s < 10 ? '0' + s : s

  return y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}

module.exports = formateDate