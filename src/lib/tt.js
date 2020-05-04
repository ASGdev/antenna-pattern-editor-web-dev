const Test = require('./test.js')

let t = new Test()

console.log(t.data)

t.setData({a: 90, g: 90})

console.log(t.data)