import React, { useContext, useEffect, useState } from 'react'
import SearchCv from '../components/SearchCv.jsx'
import { Link } from 'react-router-dom'


function AllCv() {
  const [cvs, setCvs] = useState([])

  function frenchDateFormat(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} à ${hours}:${minutes}`;
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3003/api/cv');
      const data = await response.json();
      console.log(data)
      setCvs(data);
    };
    fetchData();
  }, []);


  return (
    <>
      <SearchCv />

      {cvs.map((cv, index) => (
        <div key={index}>
          <br />
          <div className="d-flex justify-content-evenly align-items-center w-100">

            <div className="card shadow-sm w-90 p-3"> <Link to={`/cv/${cv._id}`} >
              <div className="card-body">
                <h5 className="card-title mb-2">
                  CV de {cv.author.firstname} {cv.author.lastname}
                </h5>
                <p className="card-text">{cv.description}</p>
                <p className="text-muted mb-1">
                  Crée le {frenchDateFormat(cv.createdAt)}
                </p>
                <p className="text-muted">
                  Modifié le {frenchDateFormat(cv.updatedAt)}
                </p>
              </div> </Link>
            </div>

          </div>
        </div>
      ))}

    </>
  )
}

export default AllCv;
