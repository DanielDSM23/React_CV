import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { UserContext } from '../context/UserContext.jsx'
import { Navigate, Route } from 'react-router-dom'

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.element.isRequired
}

function PrivateRoute({ path, component }) {
  const { getUserInfos } = useContext(UserContext)
  const user = getUserInfos()

  // return <Route index path={path} element={} />;
}

export default PrivateRoute
