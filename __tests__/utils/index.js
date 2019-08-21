// Reads env variables off a file and return an object
exports.getEnvVariables = () => {
  let result = {
    TRELLO_KEY: 'AAAAXXXXXXXXXXXX',
    TRELLO_TOKEN: 'TTXXXXXXXXX',
    TRELLO_LIST_ID: parseInt(Math.random() * 1000)
  }

  try {
    let env = fs.readFileSync('./.env').toString()

    env.split('\n').forEach(variable => {
      let [key, value] = variable.split('=')
      result[key.trim()] = value.trim()
    })
  } catch (error) {}

  return result
}

// Invalid list ID
exports.INVALID_TRELLO_LIST_ID = 'invalid'
