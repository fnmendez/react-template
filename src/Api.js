import { devlog } from './utils/log'
const axios = require('axios')

export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  request = async request => {
    try {
      const response = await request
      return { ...response.data, status: response.status }
    } catch (err) {
      devlog('ERROR API', err)
      return err
    }
  }

  url = endpoint => `${this.baseUrl}${endpoint}`

  GET = async endpoint => this.request(axios.get(this.url(endpoint)))

  POST = async (endpoint, body) =>
    this.request(axios.post(this.url(endpoint), body))

  login = async userData => {
    const response = await this.POST('/login', userData)
    return Promise.resolve(response)
  }
}
