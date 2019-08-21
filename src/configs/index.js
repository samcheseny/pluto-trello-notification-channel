/**
 * A list of the accepted log levels
 */
exports.ACCEPTED_LOG_LEVELS = ['emergency', 'error', 'warning', 'info', 'debug']

/**
 * Required properties in the env object
 */
exports.REQUIRED_ENV_PROPERTIES = [
  'TRELLO_KEY',
  'TRELLO_TOKEN',
  'TRELLO_LIST_ID'
]

/**
 * Required properties in the received log object
 */
exports.REQUIRED_LOG_PROPERTIES = [
  'timestamp',
  'serverName',
  'PID',
  'usedMemory',
  'message',
  'logged',
  'line',
  'function',
  'filename',
  'severity'
]

/**
 * The position the card will take on the Trello list
 */
exports.TRELLO_CARD_POSITION = 'top'

/**
 * Hostname for the Trello API
 */
exports.TRELLO_HOSTNAME = 'api.trello.com'
