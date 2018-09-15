import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import App from './App'
import Api from './Api'
import configureStore from './redux/store'
import { devlog } from './utils/log'
import { API_URI } from './constants'

const history = createHistory()
const api = new Api(API_URI)

// Redux required objects
const initialState = {}
const store = configureStore(initialState, history, { api })

// App general settings
const options = { hydratation: { blacklist: ['hydratation', 'router'] } }

devlog('index.js', 'store', store, 'options', options)

export default ReactDOM.render(
  <App store={store} options={options} history={history} />,
  document.getElementById('root') || document.createElement('root')
)
