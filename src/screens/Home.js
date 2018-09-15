import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { devlog } from '../utils/log'
import { login, saveUser } from '../redux/modules/user'
import { ContainerCenter } from '../components/Container'

const mapStateToProps = state => ({
  mail: state.user.mail,
  token: state.user.token !== '',
  loading: state.user.loading,
  error: state.user.error,
})

const mapDispatchToProps = {
  login,
  saveUser,
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mail: '',
      password: '',
      loading: false,
      error: '',
    }
  }

  submit = async e => {
    e.preventDefault()
    // const { mail, token } = await this.props.login(this.state)
    this.props.saveUser({ mail: this.state.mail })
  }

  handleChange = ev =>
    this.setState({
      [ev.target.name]: Number(ev.target.value) || ev.target.value,
    })

  render() {
    devlog('Home', this.props)
    if (!this.props.mail)
      // si no está ingresado, se renderiza
      return (
        <ContainerCenter>
          <h3>Bienvenido, solo ingresa un nombre para probar Redux :)</h3>
          <div className="container">
            <form className="col s12" ref={f => (this.form = f)}>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="mail"
                    type="email"
                    placeholder="Correo electrónico"
                    className="validate"
                    name="mail"
                    value={this.state.mail}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div>
                <button
                  className="waves-effect waves-light btn-large"
                  onClick={this.submit}
                >
                  Ingresar
                </button>
              </div>
            </form>
            <div style={{ paddingTop: '20px' }}>
              ¿No tienes cuenta? Crea una <Link to="/signup">acá</Link>.
            </div>
          </div>
        </ContainerCenter>
      )
    // si sí está ingresado, entonces
    else
      return (
        <ContainerCenter>
          <h3>Bienvenido {this.props.mail}</h3>
          <div>¡Esta aplicación es genial!</div>
          <div>Mira tu perfil para probar el logout</div>
        </ContainerCenter>
      )
  }
}

Home.propTypes = {
  mail: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  saveUser: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
