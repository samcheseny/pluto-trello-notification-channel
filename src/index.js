const Trello = require('./utils/trello')
const {
  ACCEPTED_LOG_LEVELS,
  REQUIRED_ENV_PROPERTIES,
  REQUIRED_LOG_PROPERTIES,
  TRELLO_CARD_POSITION
} = require('./configs')

class Channel {
  /**
   *
   * @param {Object} loggedMessageObject
   *
   * Holds the logic for sending notifications
   * via the channel
   * Returns the resolved promise from creating a card on Trello
   */
  static notify (loggedMessageObject) {
    this.validateEnvObject()
    this.validateLogObject(loggedMessageObject)

    let cardName = `${loggedMessageObject.severity.toUpperCase()}: 
                    ${loggedMessageObject.serverName} - 
                    ${loggedMessageObject.timestamp}`

    let options = {
      idList: process.env.TRELLO_LIST_ID,
      name: cardName,
      desc: loggedMessageObject.message,
      pos: TRELLO_CARD_POSITION,
      key: process.env.TRELLO_KEY,
      token: process.env.TRELLO_TOKEN
    }

    return Trello.createCard(options)
      .then(data => ({
        notified: true,
        data: data
      }))
      .catch(error => ({
        notified: false,
        data: error
      }))
  }

  /**
   * Checks for the required properties in
   * the process.env object
   */
  static validateEnvObject () {
    REQUIRED_ENV_PROPERTIES.forEach(property => {
      // Check if any variable is missing
      if (!process.env[property]) {
        throw new Error(`${property} is missing in the environment variables`)
      }

      // Check if any variable is empty
      if (process.env[property] === '') {
        throw new Error(
          `${property} does not have a value in the environment variables`
        )
      }
    })
  }

  /**
   *
   * @param {Object} logObject
   *
   * Checks for the required properties in
   * the received log object
   */
  static validateLogObject (logObject) {
    REQUIRED_LOG_PROPERTIES.forEach(property => {
      // Check if any variable is missing
      if (!logObject[property]) {
        throw new Error(`${property} is missing in the received log object`)
      }

      // Check if any variable is empty
      if (logObject[property] === '') {
        throw new Error(
          `${property} does not have a value in the received log object`
        )
      }

      // Check if valid severity has been sent
      if (
        property === 'severity' &&
        !ACCEPTED_LOG_LEVELS.includes(logObject[property])
      ) {
        throw new Error(
          `${
            logObject[property]
          } is not a valid log level (${ACCEPTED_LOG_LEVELS.join(',')})`
        )
      }
    })
  }
}

module.exports = Channel
