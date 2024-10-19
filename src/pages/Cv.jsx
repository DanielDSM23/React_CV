import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext.jsx'

function Cv() {
  const { id } = useParams();
  const [cv, setCv] = useState(null);
  const { getUserInfos } = useContext(UserContext);
  const navigate = useNavigate();
  const user = getUserInfos();

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
    if (!user) {
      alert('Vous ne pouvez pas acceder a cette page. Vous devez vous connecter');
      navigate('/login');
    }
  }, [user, navigate]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3003/api/cv/"+id, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.user.token}`, // Include the Bearer token
          'Content-Type': 'application/json'  // Set content type if needed
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
            <h5 className="card-title">
              {cv.author.firstname} {cv.author.lastname}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              <a href={`mailto:${cv.author.email}`} className="text-muted text-decoration-none">
                {cv.author.email}
              </a>
            </h6>
            <p className="card-text">
              {cv.description}
            </p>
            <p className="text-muted">
              Créé le {frenchDateFormat(cv.createdAt)} | Mis à jour le {frenchDateFormat(cv.updatedAt)}
            </p>
            <h6 className="mt-4">Expérience :</h6>
            {!cv.profession.length ? (
              <p className="text-muted">Ce profil n'a pas d'expérience</p>
            ) : (
              <ul className="list-group">
                {cv.profession.map((experience) => (
                  <li key={experience.title + experience.company} className="list-group-item">
                    {experience.title} chez {experience.company}
                  </li>
                ))}
              </ul>
            )}
            <h6 className="mt-4">Formation :</h6>
            {!cv.education.length ? (
              <p className="text-muted">Ce profil n'a pas de formation</p>
            ) : (
              <ul className="list-group">
                {cv.education.map((edu) => (
                  <li key={edu.title + edu.institution} className="list-group-item">
                    {edu.title} à {edu.institution} ({frenchDateFormat(edu.startDate)} - {frenchDateFormat(edu.endDate)})
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

export default Cv;
