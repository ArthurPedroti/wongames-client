global.fetch = require('node-fetch')

import { server } from '../src/utils/mockServer/server'

beforeAll(() => {
  // stay listening all the resquests on tests
  server.listen()
})

afterAll(() => {
  // reset all the handlers that were setted up to be called again
  server.resetHandlers()
})

afterAll(() => {
  // close the server and clean all tests
  server.close()
})
