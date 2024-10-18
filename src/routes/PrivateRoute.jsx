import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { UserContext } from '../context/UserContext.jsx'
import { Route, useNavigate } from 'react-router-dom'

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  element: PropTypes.element.isRequired
}

function PrivateRoute({ path, element }) {
  const { getUserInfos } = useContext(UserContext)
  const user = getUserInfos()
  const navigate = useNavigate();
  if(!user){
    navigate('/login');
  }
  return <Route index path={path} element={element} />;
}

export default PrivateRoute
