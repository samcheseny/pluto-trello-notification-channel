const https = require('https')
const querystring = require('querystring')
const { TRELLO_HOSTNAME } = require('../configs')

class Trello {
  /**
   *
   * @param {Object} options
   *
   * Creates a card on Trello
   */
  static createCard (options) {
    let query = querystring.stringify({
      idList: options.idList,
      keepFromSource: 'all',
      name: options.name,
      desc: options.description,
      pos: options.position,
      key: options.key,
      token: options.token
    })

    let config = {
      hostname: TRELLO_HOSTNAME,
      path: `/1/cards?${query}`,
      method: 'POST'
    }

    return new Promise((resolve, reject) => {
      let request = https.request(config, response => {
        let data = ''

        response.on('error', error => reject(error))

        response.on('data', chunk => (data += chunk))

        response.on('end', () => {
          if (response.statusCode === 200) {
            let result = JSON.parse(data)

            resolve({
              cardID: result.id,
              cardURL: result.url
            })
          } else {
            reject(new Error(`Status code ${response.statusCode} received`))
          }
        })
      })

      request.on('error', error => reject(error))

      request.end()
    })
  }
}

module.exports = Trello
