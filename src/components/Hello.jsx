import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext.jsx';
function Hello() {
  const { getUserInfos } = useContext(UserContext);
  const user = getUserInfos();

  return <h1>Hello world {user && user.name}</h1>;
}

export default Hello;
