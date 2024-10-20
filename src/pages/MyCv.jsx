import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx';
const {
  VITE_API_URL
} = import.meta.env;

function MyCv() {
  const { id } = useParams();
  const [cv, setCv] = useState(null);
  const { getUserInfos } = useContext(UserContext);
  const navigate = useNavigate();
  const user = getUserInfos();
  console.log(user);

  const handleAddExperience = () =>{

  }

  const handleEditExperience = () =>{

  }


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
      const response = await fetch(`${VITE_API_URL}/api/cv/my-cv`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      console.log(data);
      setCv(data);
    };
    fetchData();
  }, []);

  if (!cv) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-start w-100" style={{ marginTop: 100 }}>
        <div className="card shadow-sm w-75 p-4">
          <img src="" className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-between align-items-center">
              {cv.author.firstname} {cv.author.lastname}
              <Link to={"/profile"}>
                <button className="btn btn-primary btn-sm">
                  Modifier
                </button>
              </Link>
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              <a href={`mailto:${cv.author.email}`} className="text-muted text-decoration-none">
                {cv.author.email}
              </a>
            </h6>
            <p className="card-text">{cv.description}</p>
            <p className="text-muted">
              Créé le {frenchDateFormat(cv.createdAt)} | Mis à jour le {frenchDateFormat(cv.updatedAt)}
            </p>

            <h6 className="mt-4 d-flex justify-content-between align-items-center">
              Expérience :
              <button className="btn btn-success btn-sm" onClick={handleAddExperience}>
                Ajouter
              </button>
            </h6>
            {!cv.profession.length ? (
              <p className="text-muted">Ce profil n'a pas d'expérience</p>
            ) : (
              <ul className="list-group">
                {cv.profession.map((experience, index) => (
                  <li key={experience.title + experience.company}
                      className="list-group-item d-flex justify-content-between align-items-center">
                    {experience.title} chez {experience.company}
                    <div>
                      <button className="btn btn-primary btn-sm me-2" onClick={''}>
                        Modifier
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={''}>
                        Supprimer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <h6 className="mt-4 d-flex justify-content-between align-items-center">
              Formation :
              <button className="btn btn-success btn-sm" onClick={''}>
                Ajouter
              </button>
            </h6>
            {!cv.education.length ? (
              <p className="text-muted">Ce profil n'a pas de formation</p>
            ) : (
              <ul className="list-group">
                {cv.education.map((edu, index) => (
                  <li key={edu.title + edu.institution}
                      className="list-group-item d-flex justify-content-between align-items-center">
                    {edu.title} à {edu.institution} ({frenchDateFormat(edu.startDate)} - {frenchDateFormat(edu.endDate)})
                    <div>
                      <button className="btn btn-primary btn-sm me-2" onClick={''}>
                        Modifier
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={''}>
                        Supprimer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  )

}

export default MyCv;
