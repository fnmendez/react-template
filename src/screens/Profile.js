import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { devlog } from '../utils/log'
import { replace } from '../redux/modules/router'
import { logout } from '../redux/modules/user'
import { ContainerCenter } from '../components/Container'

const mapStateToProps = state => ({
  mail: state.user.mail,
  loading: state.user.loading,
  error: state.user.error,
})

const mapDispatchToProps = {
  replace,
  logout,
}

class Profile extends Component {
  UNSAFE_componentWillMount() {
    if (!this.props.mail) this.props.replace('/')
  }

  logout = () => {
    this.props.logout()
    this.props.replace('/')
  }

  render() {
    devlog('Profile', this.props)
    return (
      <ContainerCenter>
        <h3>Este es tu perfil {this.props.mail}</h3>
        <button onClick={this.logout}>Desconectarse</button>
      </ContainerCenter>
    )
  }
}

Profile.propTypes = {
  mail: PropTypes.string.isRequired,
  replace: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
