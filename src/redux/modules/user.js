import { REHYDRATE } from 'redux-persist/constants'
import _ from 'lodash/fp/object'

// Actions
export const SIGNUP = 'user/SIGNUP'
export const SIGNUP_PENDING = SIGNUP + '_PENDING'
export const SIGNUP_FULFILLED = SIGNUP + '_FULFILLED'
export const SIGNUP_REJECTED = SIGNUP + '_REJECTED'
export const SAVE_USER = 'user/SAVE_USER'
export const LOGIN = 'user/LOGIN'
export const LOGIN_PENDING = LOGIN + '_PENDING'
export const LOGIN_FULFILLED = LOGIN + '_FULFILLED'
export const LOGIN_REJECTED = LOGIN + '_REJECTED'
export const LOGOUT = 'user/LOGOUT'

// Initial state
const initialState = {
  mail: '',
  password: '',
  token: '',
  error: '',
  loading: false,
}

// Reducer
export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SAVE_USER: {
      return _.merge(state, payload)
    }
    case SIGNUP_PENDING: {
      return _.merge(state, { loading: true })
    }
    case SIGNUP_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case SIGNUP_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    case LOGIN_PENDING: {
      return _.merge(state, { loading: true })
    }
    case LOGIN_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case LOGIN_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    case LOGOUT: {
      state.user = undefined
      return _.merge(state, initialState)
    }
    case REHYDRATE: {
      return _.merge(state, {
        ...payload.user,
        error: '',
        loading: false,
      })
    }
    default: {
      return state
    }
  }
}

// Action creators
export const login = ({ mail, password }) => (dispatch, getState, { api }) =>
  dispatch({
    type: LOGIN,
    payload: api.login({ mail, password }),
  })

export const signup = ({ mail, password }) => (dispatch, getState, { api }) =>
  dispatch({
    type: SIGNUP,
    payload: api.signup({
      mail,
      password,
    }),
  })

export const saveUser = ({ mail, token }) => dispatch =>
  dispatch({
    type: SAVE_USER,
    payload: { mail, token },
  })

export const logout = () => dispatch => dispatch({ type: LOGOUT, payload: {} })
