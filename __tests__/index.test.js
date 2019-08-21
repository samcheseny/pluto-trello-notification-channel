process.env.NODE_ENV = 'test'
const Channel = require('../src/index')
const TestUtilities = require('./utils')
let log = {}

jest.mock('../src/utils/trello')

describe('Channel', () => {
  // To run before each the tests
  beforeEach(() => {
    let env = TestUtilities.getEnvVariables()

    // Set the env variables
    process.env.TRELLO_KEY = env.TRELLO_KEY
    process.env.TRELLO_TOKEN = env.TRELLO_TOKEN
    process.env.TRELLO_LIST_ID = env.TRELLO_LIST_ID

    // Reset the log object
    log = {
      timestamp: '01-12-2019 10:10:10.900',
      serverName: 'USEASTERN-001',
      PID: parseInt(Math.random() * 1000),
      usedMemory: parseInt(Math.random() * 1000) + 'MB',
      message: 'This is a sample log message',
      logged: 'This is a sample log message',
      line: 12,
      function: 'getAllUsers',
      filename: 'users.js',
      severity: 'info'
    }
  })

  // To run after each the tests
  afterEach(() => {})

  describe('notify', () => {
    test('should create a card on Trello', async () => {
      expect.assertions(1)

      const data = await Channel.notify(log)

      expect(data.notified).toBeTruthy()
    })

    test('should not create a card on Trello on invalid auth details', async () => {
      expect.assertions(1)

      process.env.TRELLO_LIST_ID = TestUtilities.INVALID_TRELLO_LIST_ID

      const data = await Channel.notify(log)

      expect(data.notified).toBeFalsy()
    })

    test('should throw an error on a missing env variable', () => {
      delete process.env.TRELLO_KEY

      expect(() => {
        Channel.notify(log)
      }).toThrow()
    })

    test('should throw an error on an empty env variable', () => {
      process.env.TRELLO_KEY = ''

      expect(() => {
        Channel.notify(log)
      }).toThrow()
    })

    test('should throw an error on a missing log property', () => {
      delete log.PID

      expect(() => {
        Channel.notify(log)
      }).toThrow()
    })

    test('should throw an error on an empty log property', () => {
      log.serverName = ''

      expect(() => {
        Channel.notify(log)
      }).toThrow()
    })
  })
})
