import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx'

export default function Home() {
  const { getUserInfos } = useContext(UserContext);
  const user = getUserInfos();


  return (

    <div className="d-flex justify-content-center align-items-center flex-column"
         style={{ height: '100vh' }}>
        <h1 className={"text-light"}>Bienvenue {user ? "parmi nous " + user.firstname + ' ' + user.lastname : "sur CvDesigner"} </h1>
        <p className={"text-light"}>Boostez votre carrière avec un CV impactant</p>
    </div>
  )
}