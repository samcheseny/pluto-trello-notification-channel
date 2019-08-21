process.env.NODE_ENV = 'test'
const Trello = require('../src/utils/trello')
const TestUtilities = require('./utils')
let options = {}

jest.mock('https')

describe('Trello', () => {
  // To run before each test
  beforeEach(() => {
    let env = TestUtilities.getEnvVariables()

    options = {
      idList: env.TRELLO_LIST_ID,
      name: 'INFO: USEASTERN001 - 2010-02-02 12:12:12.900',
      desc: 'A message was logged',
      pos: 'top',
      key: env.TRELLO_KEY,
      token: env.TRELLO_TOKEN
    }
  })

  // To run after each test
  afterEach(() => {})

  describe('createCard', () => {
    test('should return a promise that resolves to an object with card details', async () => {
      expect.assertions(1)

      let data = await Trello.createCard(options)

      expect(data).toHaveProperty('cardID')
    })

    test('should throw an error on invalid list ID credentials', async () => {
      expect.assertions(1)

      options.idList = TestUtilities.INVALID_TRELLO_LIST_ID

      await expect(Trello.createCard(options)).rejects.toThrow()
    })
  })
})
