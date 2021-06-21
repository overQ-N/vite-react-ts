const sem = require('./semaphore')(10)
console.log(sem)
var server = require('http').createServer(function (req, res) {
  res.write('Then good day, madam!')

  sem.take(function () {
    res.end('We hope to see you soon for tea.')
    // sem.leave()
  })
})
server.listen(3008)
