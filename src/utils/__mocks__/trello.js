const TestUtilities = require('../../../__tests__/utils')

class Trello {
  static createCard (options) {
    return new Promise((resolve, reject) => {
      if (options.idList === TestUtilities.INVALID_TRELLO_LIST_ID) {
        return reject(new Error('Invalid list ID'))
      }

      resolve({
        cardID: parseInt(Math.random() * 1000),
        cardURL: 'https://trello.com/c/ZC9tnpWi/hello-world'
      })
    })
  }
}

module.exports = Trello
