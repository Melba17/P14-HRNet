import { Link } from 'react-router-dom';
import './style.css';

/**
 * Page affichée lorsque la route demandée n'existe pas (erreur 404).
 *
 * Fournit un message explicite et un lien de retour vers l'accueil.
 *
 * @component
 */
function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p className="notfound-message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="notfound-link-wrapper">
        <Link
          to="/"
          className="notfound-link"
          aria-label="Back to home page"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
