const TestUtilities = require('../__tests__/utils')
const https = jest.genMockFromModule('https')
const EventEmitter = require('events')

class Request extends EventEmitter {
  constructor () {
    super()
  }

  end () {}
}

class Response extends EventEmitter {
  constructor (statusCode) {
    super()

    this.statusCode = statusCode

    process.nextTick(() => {
      if (this.statusCode !== 200) {
        this.emit('end')
        return
      }

      let results = JSON.stringify({
        id: 123,
        url: 'https://trello.com/cards'
      })

      let characters = 5

      let start = 0

      while (start < results.length) {
        let chunk = results.substr(start, characters)

        this.emit('data', chunk)

        start += characters
      }

      this.emit('end')
    })
  }
}

https.request = (options, callback) => {
  let response = null

  if (options.path.includes(TestUtilities.INVALID_TRELLO_LIST_ID)) {
    response = new Response(422)
  } else {
    response = new Response(200)
  }

  callback(response)

  return new Request()
}

module.exports = https
