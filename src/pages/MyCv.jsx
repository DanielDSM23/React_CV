import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';

const {
  VITE_API_URL
} = import.meta.env;

function MyCv() {
  const [cv, setCv] = useState(null);
  const { getUserInfos } = useContext(UserContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
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

  const handleVisibility = async (id) => {
    try {
      const response = await fetch(`${VITE_API_URL}/api/cv/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visible: !visible }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setVisible(data.visible);
        alert(data.visible ? 'Votre CV est visible par tous' : 'Votre CV est privé');
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleDeleteXp = async (id) => {
    try {
      const response = await fetch(`${VITE_API_URL}/api/cv/profession/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Experience supprimée");
        navigate(0);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/api/cv/my-cv`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCv(data);
          setVisible(data.visible);
        } else {
          console.error('Failed to fetch CV');
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [user.token]);

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
            <button className="btn btn-info mb-3" onClick={() => handleVisibility(cv._id)}>
              {visible ? 'Rendre privé' : 'Rendre visible'}
            </button>
            <h5 className="card-title d-flex justify-content-between align-items-center">
              {cv.author.firstname} {cv.author.lastname}
              <Link to="/profile">
                <button className="btn btn-primary btn-sm">Modifier</button>
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
              <Link to="/my-cv/profession/add">
                <button className="btn btn-success btn-sm">Ajouter</button>
              </Link>
            </h6>
            {!cv.profession.length ? (
              <p className="text-muted">Aucune experience n&#39;a été renseignée</p>
            ) : (
              <ul className="list-group">
                {cv.profession.map((experience) => (
                  <li key={experience.title + experience.company}
                      className="list-group-item d-flex justify-content-between align-items-center">
                    {experience.title} chez {experience.company}
                    <div>
                      <Link to={`/my-cv/profession/edit/${experience._id}`}>
                        <button className="btn btn-primary btn-sm me-2">Modifier</button>
                      </Link>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteXp(experience._id)}>Supprimer</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <h6 className="mt-4 d-flex justify-content-between align-items-center">
              Formation :
              <Link to="/my-cv/education/add">
                <button className="btn btn-success btn-sm">Ajouter</button>
              </Link>
            </h6>
            {!cv.education.length ? (
              <p className="text-muted">Aucune formation n&#39;a été renseignée</p>
            ) : (
              <ul className="list-group">
                {cv.education.map((edu) => (
                  <li key={edu.title + edu.institution}
                      className="list-group-item d-flex justify-content-between align-items-center">
                    {edu.startDate ? (
                      `${edu.title} à ${edu.institution} (${frenchDateFormat(edu.startDate)} - ${frenchDateFormat(edu.endDate)})`
                    ) : (
                      `${edu.title} à ${edu.institution}`
                    )}
                    <div>
                      <Link to={`/my-cv/education/edit/${edu._id}`}>
                        <button className="btn btn-primary btn-sm me-2">Modifier</button>
                      </Link>
                      <button className="btn btn-danger btn-sm">Supprimer</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCv;
