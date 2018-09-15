import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { devlog } from '../utils/log'
import { ContainerCenter } from '../components/Container'

const mapStateToProps = state => ({
  mail: state.user.mail,
})

const Other = () => {
  devlog('Other', this.props)
  return <ContainerCenter>Otra vista...</ContainerCenter>
}

Other.propTypes = {
  mail: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  null
)(Other)
