import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx'

export default function Home() {

  const { getUserInfos } = useContext(UserContext);
  const user = getUserInfos();
  console.log(user);

  return (
    <div>
        <h1 className={"text-light"}>Bienvenue {user ? "parmi nous " + user.user.firstname + ' ' + user.user.lastname : "sur CvDesigner"} </h1>
        <p className={"text-light"}>Boostez votre carrière avec un CV impactant</p>
    </div>
  )
}