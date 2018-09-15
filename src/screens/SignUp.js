import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { devlog } from '../utils/log'
import { replace } from '../redux/modules/router'
import { ContainerCenter } from '../components/Container'

const mapStateToProps = state => ({
  mail: state.user.mail,
  token: state.user.token !== '',
  loading: state.user.loading,
  error: state.user.error,
})

const mapDispatchToProps = {
  replace,
}

class SignUp extends Component {
  UNSAFE_componentWillMount() {
    if (this.props.mail) this.props.replace('/')
  }

  onClick = () => this.props.replace('/')

  render() {
    devlog('SignUp', this.props)
    // si no está ingresado, se renderiza
    if (!this.props.token)
      return (
        <ContainerCenter>
          <h3>Bienvenido, haz tu SignUp aquí</h3>
        </ContainerCenter>
      )
    // si sí está ingresado, entonces
    else
      return (
        <ContainerCenter>
          <h3>Bienvenido {this.props.mail}</h3>
          <div>¡Esta aplicación es genial!</div>
          <button onClick={this.onClick}>Volver al inicio</button>
        </ContainerCenter>
      )
  }
}

SignUp.propTypes = {
  mail: PropTypes.string.isRequired,
  token: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  replace: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
