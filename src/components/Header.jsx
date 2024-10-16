import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { useContext } from 'react';

function Header() {
  const { getUserInfos, logout } = useContext(UserContext);
  const user = getUserInfos();

  return (
    <header className="blur-header">
      <nav className="navbar navbar-expand-lg container">
        <Link className="navbar-brand" to="/">CvDesigner</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cv">Cv</Link>
            </li>
            { user ? (<><li className="nav-item">
                <Link className="nav-link" to="/my-cv">Mon Cv</Link>
              </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={logout}>Se Deconnecter</a>
                </li></>) :
              (<li className="nav-item">
                <Link className="nav-link" to="/login">Se Connecter</Link>
              </li>)}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
